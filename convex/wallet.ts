import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const connectWallet = mutation({
  args: {
    address: v.string(),
    sessionDuration: v.number(),
    walletType: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Clear any existing sessions
    const existing = await ctx.db
      .query("walletSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    for (const session of existing) {
      await ctx.db.delete(session._id);
    }

    // Create new session
    await ctx.db.insert("walletSessions", {
      userId,
      address: args.address,
      expiresAt: Date.now() + args.sessionDuration,
      walletType: args.walletType,
    });
  },
});

export const getCurrentSession = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const session = await ctx.db
      .query("walletSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!session) return null;

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      // We can't delete in a query, so we'll just return null
      // The session will be cleaned up on the next mutation
      return null;
    }

    return session;
  },
});

export const disconnectWallet = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const sessions = await ctx.db
      .query("walletSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }
  },
});
