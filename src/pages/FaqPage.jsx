import { NavLink, Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Seo } from "../components/Seo.jsx";
import { Footer } from "../components/Footer.jsx";

/* ─── Shared link style ──────────────────────────────────────────────────── */
const lc =
  "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";

/* ─── Prose helpers ──────────────────────────────────────────────────────── */
function H2({ children }) {
  return (
    <h2 className="font-serif text-xl font-medium text-text sm:text-2xl">
      {children}
    </h2>
  );
}
function Box({ children }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      {children}
    </div>
  );
}
function NumBox({ n, title, children }) {
  return (
    <Box>
      <div className="flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
          {n}
        </span>
        <div>
          <H2>{title}</H2>
          <div className="mt-3 leading-relaxed text-muted">{children}</div>
        </div>
      </div>
    </Box>
  );
}
function InfoBox({ children }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-5 py-4 text-[15px] leading-relaxed text-text">
      {children}
    </div>
  );
}
function Divider() {
  return <div className="border-t border-border" />;
}

/* ─── Article content components ─────────────────────────────────────────── */

/* ---------- Getting Started ---------- */

function WhatIsGamiLifeContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife is a gamified self-growth app that turns real effort into
        measurable progress. You log goals, run timed sessions, and earn XP
        across five life aspects - Physique, Energy, Logic, Creativity, and
        Social.
      </p>
      <Box>
        <H2>The five aspects</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li><strong className="text-text">Physique</strong> - strength, movement, physical health</li>
          <li><strong className="text-text">Energy</strong> - focus, stamina, mental endurance</li>
          <li><strong className="text-text">Logic</strong> - learning, strategy, problem-solving</li>
          <li><strong className="text-text">Creativity</strong> - creation, art, experimentation</li>
          <li><strong className="text-text">Social</strong> - communication, empathy, relationships</li>
        </ul>
      </Box>
      <div>
        <H2>How it works</H2>
        <div className="mt-4 space-y-3 leading-relaxed text-muted">
          <p>
            Create a goal for something you genuinely want to achieve. Link it
            to an activity type (like Running, Deep Work, or Drawing). Start a
            timed session, and GamiLife's AI engine reads the context and
            duration of your effort to distribute XP across the aspects you
            exercised.
          </p>
          <p>
            As you earn XP, your life level rises and aspect-specific progress
            fills in. Sustained commitment in one area unlocks Mastery Titles
            and Achievements.
          </p>
        </div>
      </div>
      <Divider />
      <div>
        <H2>Is it available now?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          GamiLife V1 is rolling out. Join the{" "}
          <a href="https://discord.gg/zW7eZEyAKQ" className={lc}>
            official Discord community
          </a>{" "}
          to connect with other people already building momentum.
        </p>
      </div>
    </div>
  );
}

function HowToRegisterContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Creating a GamiLife account takes under a minute.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open the registration page">
          Go to the GamiLife app and tap <strong className="text-text">Sign Up</strong> or{" "}
          <strong className="text-text">Register</strong> on the login screen.
        </NumBox>
        <NumBox n="2" title="Fill in your details">
          You need four things: a <strong className="text-text">display name</strong> (shown
          to others, max 15 characters), a <strong className="text-text">username</strong>{" "}
          (lowercase letters, numbers, and underscores only, max 15 characters), an{" "}
          <strong className="text-text">email address</strong>, and a{" "}
          <strong className="text-text">password</strong>. Confirm the password in the
          second field.
        </NumBox>
        <NumBox n="3" title="Submit and log in">
          Tap <strong className="text-text">Create Account</strong>. You&apos;ll be taken
          directly into the app.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Age requirement</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You must be at least 13 years old to use GamiLife.
        </p>
      </div>
    </div>
  );
}

function GuidedTourContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        The Guided Tour is an interactive walkthrough that teaches you GamiLife
        by walking through the actual app with a spotlight and explanations at
        each step.
      </p>
      <Box>
        <H2>What it covers</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li><strong className="text-text">Your Feed</strong> - how to read and interact with posts from people you follow</li>
          <li><strong className="text-text">Goals</strong> - how to create a goal and start your first session</li>
          <li><strong className="text-text">Sessions</strong> - the live session timer, focus/break mode, and pausing</li>
          <li><strong className="text-text">Reflection</strong> - what happens when a session ends and how XP is recorded</li>
        </ul>
      </Box>
      <div>
        <H2>How to start the tour</H2>
        <div className="mt-4 space-y-2 leading-relaxed text-muted">
          <p>
            Go to <strong className="text-text">Settings</strong> and tap{" "}
            <strong className="text-text">Guided Tour</strong>. The tour begins on
            your Feed and walks forward through Goals, a live session, and the
            reflection screen.
          </p>
          <p>
            You can exit the tour at any time using the{" "}
            <strong className="text-text">✕</strong> button in the top-right of the
            tour dialog, and restart it from Settings whenever you like.
          </p>
        </div>
      </div>
    </div>
  );
}

function XpExplainedContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        XP (experience points) is GamiLife&apos;s measure of effort. Every completed
        session earns XP, which is split across the five aspects based on what
        you actually did.
      </p>
      <Box>
        <H2>How XP is calculated</H2>
        <p className="mt-4 leading-relaxed text-muted">
          GamiLife&apos;s AI reads the activity type, your goal context, and the
          session&apos;s focused duration. It produces per-second XP rates for each
          aspect, so a longer or more focused session earns more XP. Paused time
          is excluded - only time you were actively working counts.
        </p>
      </Box>
      <Box>
        <H2>Life level vs aspect level</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <strong className="text-text">Life level</strong> is your overall level, based on
            total XP earned across everything.
          </li>
          <li>
            <strong className="text-text">Aspect level</strong> tracks your depth in each of
            the five areas separately. Spending more time on Logic-type activities
            raises your Logic aspect level faster.
          </li>
        </ul>
      </Box>
      <Divider />
      <div>
        <H2>Does XP decay?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          XP earned from completed sessions is permanent and never decays.
          Streaks have their own separate tracking, but missing a day does not
          remove previously earned XP.
        </p>
      </div>
    </div>
  );
}

function MasteryTitlesContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Mastery Titles are long-term recognitions earned by accumulating XP in
        a specific life aspect. There are five titles, one for each path.
      </p>
      <Box>
        <H2>The five Mastery Titles</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li><strong className="text-text">Warrior</strong> - Physique mastery</li>
          <li><strong className="text-text">Protagonist</strong> - Energy mastery</li>
          <li><strong className="text-text">Prodigy</strong> - Logic mastery</li>
          <li><strong className="text-text">Alchemist</strong> - Creativity mastery</li>
          <li><strong className="text-text">Diplomat</strong> - Social mastery</li>
        </ul>
      </Box>
      <div>
        <H2>How to earn them</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Log sessions tied to activities in a specific aspect consistently over
          time. As your aspect-level grows, you progress through mastery ranks
          in that path. Your current Mastery Title is displayed on your profile
          and on leaderboards.
        </p>
      </div>
      <Divider />
      <div>
        <H2>Can I have more than one?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You progress in all five paths simultaneously - GamiLife tracks them
          independently. Your primary Mastery Title shown on your profile is the
          one where you&apos;ve reached the highest rank.
        </p>
      </div>
    </div>
  );
}

function AchievementsContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Achievements are milestone badges that recognize specific things you
        have done in GamiLife - like completing your first session, reaching a
        certain life level, or maintaining a streak.
      </p>
      <Box>
        <H2>Where to see your achievements</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Achievements appear on your profile page. Others can also see them
          when they visit your profile, if your account is set to Public.
        </p>
      </Box>
      <div>
        <H2>How to unlock achievements</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Achievements unlock automatically when you hit their criteria - there
          is nothing to claim manually. Keep logging sessions, maintaining
          streaks, and reaching new levels and they will appear on your profile
          as you earn them.
        </p>
      </div>
    </div>
  );
}

/* ---------- Goals ---------- */

function CreateGoalContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Goals are the core of GamiLife. A goal represents something real you
        want to achieve, and every session you log is tied to a goal.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open the Goals tab">
          Tap <strong className="text-text">Goals</strong> in the navigation. Then tap
          the <strong className="text-text">+ New Goal</strong> button.
        </NumBox>
        <NumBox n="2" title="Fill in the details">
          <ul className="space-y-2">
            <li>
              <strong className="text-text">Title</strong> - what you want to achieve
              (e.g., "Learn to play guitar")
            </li>
            <li>
              <strong className="text-text">Description</strong> - optional extra
              context about the goal
            </li>
            <li>
              <strong className="text-text">Finish by</strong> - pick a preset period
              (1 week, 2 weeks, 1 month, 6 months) or set a custom date
            </li>
          </ul>
        </NumBox>
        <NumBox n="3" title="Save">
          Tap <strong className="text-text">Create Goal</strong>. Your goal appears
          in the Goals list with an <em>Ongoing</em> status.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>What happens next</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Once a goal is created, start a session from the goal detail page to
          begin earning XP toward it. Each session you log is recorded and
          visible in the goal&apos;s session history.
        </p>
      </div>
    </div>
  );
}

function GoalStatusContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Every goal in GamiLife has a status that reflects where you are with
        it.
      </p>
      <Box>
        <H2>The five statuses</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li><strong className="text-text">Planned</strong> - created but no sessions logged yet</li>
          <li><strong className="text-text">Ongoing</strong> - actively working on it</li>
          <li><strong className="text-text">Paused</strong> - temporarily set aside</li>
          <li><strong className="text-text">Completed</strong> - you marked it done</li>
          <li><strong className="text-text">Abandoned</strong> - stopped without completing</li>
        </ul>
      </Box>
      <div>
        <H2>Changing a goal&apos;s status</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Open the goal and use the status menu to change it. Moving a goal to
          Completed or Abandoned is permanent - this action cannot be undone.
          GamiLife will ask you to confirm before making that change.
        </p>
      </div>
    </div>
  );
}

function EditGoalContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        You can edit a goal&apos;s title, description, and finish-by date at any
        time, as long as it has not been marked as Completed or Abandoned.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open the goal">
          Tap the goal in your Goals list to open its detail page.
        </NumBox>
        <NumBox n="2" title="Tap Edit">
          Find the edit option (pencil icon or overflow menu) and tap it. The
          edit form pre-fills with the current values.
        </NumBox>
        <NumBox n="3" title="Save changes">
          Update the title, description, or finish-by date and tap{" "}
          <strong className="text-text">Save</strong>.
        </NumBox>
      </div>
    </div>
  );
}

function DeleteGoalContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Deleting a goal permanently removes it and all sessions logged under
        it. This cannot be undone.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open the goal">
          Tap the goal in your Goals list to open its detail page.
        </NumBox>
        <NumBox n="2" title="Open the options menu">
          Tap the overflow or options button on the goal.
        </NumBox>
        <NumBox n="3" title="Select Delete and confirm">
          Tap <strong className="text-text">Delete Goal</strong>. GamiLife will ask
          you to confirm before permanently removing the goal and its session
          history.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Does deleting a goal remove earned XP?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          XP already credited to your account from sessions logged under this
          goal is not removed when you delete the goal. XP is permanent once
          earned.
        </p>
      </div>
    </div>
  );
}

/* ---------- Sessions & Tracking ---------- */

function StartSessionContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        A session is a timed block of focused work. Every session is tied to a
        goal and an activity type, and earns XP based on your focused duration.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open a goal">
          Go to the Goals tab and tap the goal you want to work on.
        </NumBox>
        <NumBox n="2" title="Tap Start Session">
          On the goal detail page, tap{" "}
          <strong className="text-text">Start Session</strong>. If you have recent
          activities, GamiLife will offer them as quick picks. You can also
          search for or create a new activity.
        </NumBox>
        <NumBox n="3" title="The session begins">
          The live session screen shows your elapsed time, current XP
          accumulating in real time, and a Pomodoro-style focus/break cycle
          (25-minute focus, 5-minute break). Only focused time counts toward
          XP - break time and pause time are excluded.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Starting a session from an activity page</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You can also start a session directly from any activity&apos;s detail
          page. Tap the activity in Search, then tap{" "}
          <strong className="text-text">Start Session</strong> and choose which goal
          to log it under.
        </p>
      </div>
    </div>
  );
}

function PauseSessionContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        You can pause a session at any time. Paused time does not count toward
        your XP - only focused time does.
      </p>
      <Box>
        <H2>How to pause</H2>
        <p className="mt-4 leading-relaxed text-muted">
          On the live session screen, tap the{" "}
          <strong className="text-text">Pause</strong> button. The timer stops
          and a &quot;Paused&quot; state is shown. Tap{" "}
          <strong className="text-text">Resume</strong> when you&apos;re ready to
          continue.
        </p>
      </Box>
      <Divider />
      <div>
        <H2>What happens if I close the app during a session?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          GamiLife tracks live sessions through Convex, which keeps your session
          state in sync. If you return to the app after closing it during an
          active session, GamiLife will detect the ongoing session and let you
          resume or end it. Sessions that have been inactive for a long time may
          be flagged as stale and cleaned up automatically.
        </p>
      </div>
    </div>
  );
}

function CompleteSessionContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        When you finish your work, ending the session records your XP and
        updates your goal&apos;s progress.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Tap Complete">
          On the live session screen, tap{" "}
          <strong className="text-text">Complete Session</strong>.
        </NumBox>
        <NumBox n="2" title="The Reflection screen">
          GamiLife shows you a summary of the session: focused duration, total
          XP earned, and how XP was split across your aspects. You can also
          optionally upload a completion photo to share what you worked on.
        </NumBox>
        <NumBox n="3" title="Session saved">
          The session is saved to your goal&apos;s history and XP is credited to
          your account immediately.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Abandoning instead of completing</H2>
        <p className="mt-4 leading-relaxed text-muted">
          If you want to end a session without recording it, tap{" "}
          <strong className="text-text">Abandon</strong>. An abandoned session is
          recorded as abandoned and earns reduced or no XP depending on how much
          focused time was logged.
        </p>
      </div>
    </div>
  );
}

function PomodoroContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife&apos;s session timer is built around the Pomodoro technique - a
        scientifically supported work pattern that alternates focused work with
        short breaks to sustain attention and prevent burnout.
      </p>
      <Box>
        <H2>The cycle</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li><strong className="text-text">Focus phase</strong> - 25 minutes of active work. XP accumulates during this phase.</li>
          <li><strong className="text-text">Break phase</strong> - 5 minutes to rest. No XP accumulates during breaks.</li>
          <li>A chime plays when each phase ends to signal the transition.</li>
        </ul>
      </Box>
      <div>
        <H2>XP during breaks</H2>
        <p className="mt-4 leading-relaxed text-muted">
          XP only accumulates during focus time. Break time and any time the
          session is paused are excluded from the XP calculation. This means
          the XP you earn reflects genuine focused effort, not time left
          running in the background.
        </p>
      </div>
    </div>
  );
}

/* ---------- Activities ---------- */

function WhatAreActivitiesContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        An activity defines the type of work you do in a session - for example,
        Running, Deep Work, Drawing, or Studying. Each activity belongs to one
        of the five aspects, and GamiLife uses it (along with your goal context)
        to decide how XP is distributed.
      </p>
      <Box>
        <H2>Activity types and aspects</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li><strong className="text-text">Physique</strong> - running, strength training, sport, physical movement</li>
          <li><strong className="text-text">Energy</strong> - deep work, meditation, focus blocks, sleep hygiene</li>
          <li><strong className="text-text">Logic</strong> - studying, coding, chess, language learning, strategy</li>
          <li><strong className="text-text">Creativity</strong> - drawing, writing, music, design, building</li>
          <li><strong className="text-text">Social</strong> - networking, public speaking, journaling, relationships</li>
        </ul>
      </Box>
      <div>
        <H2>Browsing activities</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Open <strong className="text-text">Search</strong> and browse or search for
          activities. Tapping an activity shows its detail page with leaderboards,
          live sessions from people currently doing it, and your own session
          history for that activity.
        </p>
      </div>
    </div>
  );
}

function CreateActivityContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        If you can&apos;t find the activity you want in GamiLife&apos;s library, you can
        create a custom one.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Start a new session">
          Open a goal and tap <strong className="text-text">Start Session</strong>.
        </NumBox>
        <NumBox n="2" title="Tap 'New Activity'">
          On the activity picker that appears, tap{" "}
          <strong className="text-text">New Activity</strong> (or the equivalent
          create option).
        </NumBox>
        <NumBox n="3" title="Name it and pick a type">
          Give your activity a name and select which of the five aspects it
          belongs to. GamiLife uses the activity type to weight XP distribution
          appropriately.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Custom activities and the activity library</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Custom activities are available to you across all your goals. They
          work identically to built-in activities for XP calculation.
        </p>
      </div>
    </div>
  );
}

function ActivityLeaderboardContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Every activity in GamiLife has its own leaderboard ranking the top XP
        earners for that specific activity.
      </p>
      <Box>
        <H2>How to view it</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Go to <strong className="text-text">Search</strong>, find the activity,
          and tap its name to open the activity detail page. Scroll to the
          leaderboard section to see rankings. Your own position is highlighted
          if you&apos;ve logged sessions for it.
        </p>
      </Box>
      <Box>
        <H2>Live sessions</H2>
        <p className="mt-4 leading-relaxed text-muted">
          The activity detail page also shows who is{" "}
          <strong className="text-text">currently live</strong> - people with an
          active session for this activity right now. You can see their progress
          in real time, which makes it easy to find accountability partners.
        </p>
      </Box>
      <Divider />
      <div>
        <H2>Global leaderboard</H2>
        <p className="mt-4 leading-relaxed text-muted">
          In addition to per-activity rankings, GamiLife has overall
          leaderboards accessible from the{" "}
          <strong className="text-text">Leaderboard</strong> tab - sorted by
          total XP, and filterable by Mastery Title path.
        </p>
      </div>
    </div>
  );
}

/* ---------- Social & Community ---------- */

function FeedContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        The Feed is GamiLife&apos;s home screen. It shows posts and completed sessions
        from people you follow.
      </p>
      <Box>
        <H2>What appears in the feed</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Completed session posts from people you follow - including activity name, duration, XP earned, and an optional completion photo</li>
          <li>Goal posts shared publicly by people you follow</li>
          <li>Live session status for people currently working on something</li>
        </ul>
      </Box>
      <div>
        <H2>Interacting with posts</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You can <strong className="text-text">like</strong> a post,{" "}
          <strong className="text-text">comment</strong> on it, or{" "}
          <strong className="text-text">nudge</strong> someone mid-session to cheer
          them on. Nudges appear as a notification for the person while they are
          actively working.
        </p>
      </div>
    </div>
  );
}

function FollowingContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Following someone adds their posts and sessions to your Feed, so you
        can track their progress and hold each other accountable.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Find someone">
          Go to <strong className="text-text">Search</strong> and search by
          username or name. Tap their profile.
        </NumBox>
        <NumBox n="2" title="Tap Follow">
          Tap the <strong className="text-text">Follow</strong> button on their
          profile. If their account is Private, they&apos;ll need to approve your
          request first.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Unfollowing</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Visit the person&apos;s profile and tap{" "}
          <strong className="text-text">Unfollow</strong>. Their posts will no longer
          appear in your Feed.
        </p>
      </div>
    </div>
  );
}

function ProfilePageContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Your profile is the public-facing summary of your GamiLife progress.
      </p>
      <Box>
        <H2>What&apos;s on your profile</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li><strong className="text-text">Avatar and display name</strong></li>
          <li><strong className="text-text">Life level and current XP progress</strong></li>
          <li><strong className="text-text">Mastery Title</strong> - your highest earned mastery rank</li>
          <li><strong className="text-text">Aspect radar chart</strong> - a visual breakdown of XP across the five aspects</li>
          <li><strong className="text-text">Achievements</strong></li>
          <li><strong className="text-text">Goal and session history</strong></li>
          <li><strong className="text-text">Followers and following counts</strong></li>
          <li><strong className="text-text">Streak</strong> - consecutive days with at least one session</li>
        </ul>
      </Box>
      <div>
        <H2>Editing your profile</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Go to <strong className="text-text">Settings</strong> and tap{" "}
          <strong className="text-text">Edit Profile</strong>. You can change your
          display name, bio, personal title, and profile picture. Your username
          cannot be changed from the profile edit screen.
        </p>
      </div>
    </div>
  );
}

function LeaderboardContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Leaderboards let you see how your progress compares to others in the
        GamiLife community.
      </p>
      <Box>
        <H2>Types of leaderboards</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <strong className="text-text">Overall (Rookie)</strong> - global ranking
            by total XP earned
          </li>
          <li>
            <strong className="text-text">Mastery leaderboards</strong> - one for
            each of the five Mastery Title paths (Warrior, Protagonist, Prodigy,
            Alchemist, Diplomat), ranking by XP in that aspect
          </li>
          <li>
            <strong className="text-text">Activity leaderboards</strong> - per-activity
            ranking visible from any activity&apos;s detail page
          </li>
        </ul>
      </Box>
      <div>
        <H2>How to access</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Tap <strong className="text-text">Leaderboard</strong> in the navigation.
          Switch between Overall and Mastery tabs to see different rankings.
        </p>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        You decide whether GamiLife is a private personal-growth tool or a
        public social experience.
      </p>
      <Box>
        <H2>Account types</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <strong className="text-text">Public</strong> - your profile, goals,
            and sessions are visible to everyone. You appear in search results
            and on leaderboards.
          </li>
          <li>
            <strong className="text-text">Private</strong> - your content is only
            visible to people you approve as followers. You still appear in
            leaderboards with your username.
          </li>
        </ul>
      </Box>
      <div>
        <H2>Changing your account type</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Go to <strong className="text-text">Settings</strong> and change the
          Account Type toggle between Public and Private. The change takes effect
          immediately.
        </p>
      </div>
    </div>
  );
}

/* ---------- Discord Bot ---------- */

function LinkDiscordContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Linking your Discord account lets the GamiLife bot show your real stats
        and give personalised suggestions based on your actual goals. It&apos;s also
        required for commands like <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/profile</code>,{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/stats</code>, and{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/today</code>.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Run /link in Discord">
          In any channel of the GamiLife Discord server, type{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/link</code>{" "}
          and send it. The bot replies with an ephemeral message (only you can
          see it) containing a{" "}
          <strong className="text-text">Link GamiLife Account</strong> button.
        </NumBox>
        <NumBox n="2" title="Tap the button">
          Clicking the button opens a secure, single-use URL in your browser.
          You must already be logged in to GamiLife in that browser for the link
          to work.
        </NumBox>
        <NumBox n="3" title="Done">
          Once linked, the bot recognises your Discord user as your GamiLife
          account. All bot commands that show your data will now work.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Already linked?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          If you run <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/link</code> again
          after your account is already linked, the bot will tell you so and
          skip generating a new token.
        </p>
      </div>
    </div>
  );
}

function BotCommandsContent() {
  const cmd = (name) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">
      /{name}
    </code>
  );
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        The GamiLife Discord bot supports the following slash commands.
      </p>
      <div className="space-y-5">
        <Box>
          <div className="space-y-4">
            {[
              { cmd: "link", desc: "Link your Discord account to GamiLife. Sends a private, single-use URL button." },
              { cmd: "profile [user]", desc: "Show a profile card with life level, Mastery Title, and a radar chart of XP across the five aspects. Defaults to your own profile." },
              { cmd: "stats [user]", desc: "Show detailed XP and level stats. Defaults to your own stats." },
              { cmd: "compare <user>", desc: "Side-by-side comparison of your stats versus another linked user." },
              { cmd: "today [user]", desc: "Show today's logged activity and XP earned so far today." },
              { cmd: "leaderboard [category]", desc: "Show the global XP leaderboard. Optionally filter by aspect: physique, energy, logic, creativity, or social." },
              { cmd: "bored", desc: "Suggests an activity based on your ongoing goals. Falls back to popular activities if you're not linked or have no active goals." },
              { cmd: "roast [user]", desc: "Get an AI-generated playful roast based on activity history. Defaults to you." },
              { cmd: "help", desc: "Show a quick guide to all available commands." },
            ].map(({ cmd: c, desc }) => (
              <div key={c} className="flex gap-3">
                <code className="shrink-0 rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/{c}</code>
                <span className="leading-relaxed text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </Box>
      </div>
      <Divider />
      <div>
        <H2>Which commands need a linked account?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          {cmd("profile")}, {cmd("stats")}, {cmd("today")}, {cmd("compare")}, and
          the personalised {cmd("bored")} suggestion all require a linked account.{" "}
          {cmd("leaderboard")}, {cmd("roast")}, and {cmd("help")} work without
          one.
        </p>
      </div>
    </div>
  );
}

function ActivityFeedContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife&apos;s Discord bot automatically posts to a designated channel
        whenever someone starts or completes a session - a live activity feed
        that keeps the community aware of who is working on what in real time.
      </p>
      <Box>
        <H2>What it posts</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>When a session starts: the user, activity name, and goal they&apos;re working on</li>
          <li>When a session ends: the completion message edits the original "started" post with duration and XP earned</li>
        </ul>
      </Box>
      <div>
        <H2>How it works</H2>
        <p className="mt-4 leading-relaxed text-muted">
          The bot listens to GamiLife&apos;s live session system in real time. Posts
          appear automatically - there&apos;s nothing to opt in to individually.
          Only sessions from linked accounts appear in the feed.
        </p>
      </div>
    </div>
  );
}

function BoredCommandContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/bored</code> is a
        smart activity suggestion command. When you&apos;re not sure what to work on,
        the bot picks something based on your actual ongoing goals.
      </p>
      <Box>
        <H2>How it picks a suggestion</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>If your Discord is linked and you have ongoing goals, it recommends an activity that fits one of them</li>
          <li>If you&apos;re not linked, or have no active goals, it falls back to the most popular activities in the community</li>
        </ul>
      </Box>
      <Box>
        <H2>Message trigger</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You can also trigger a suggestion just by typing something like{" "}
          <strong className="text-text">&quot;I&apos;m bored&quot;</strong> or{" "}
          <strong className="text-text">&quot;bored&quot;</strong> in the designated
          bored channel. The bot has an 80% chance of responding - it doesn&apos;t
          jump in on every mention to avoid being annoying in regular chat.
        </p>
      </Box>
      <Divider />
      <div>
        <H2>After the suggestion</H2>
        <p className="mt-4 leading-relaxed text-muted">
          The bot&apos;s suggestion includes a button that links directly to the
          activity in GamiLife so you can start a session immediately.
        </p>
      </div>
    </div>
  );
}

function RoastCommandContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/roast</code> asks the
        bot&apos;s AI to write a short, playful roast based on a user&apos;s GamiLife
        activity history.
      </p>
      <InfoBox>
        Run <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/roast</code> to
        roast yourself, or{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm font-mono text-text">/roast @username</code>{" "}
        to roast someone else.
      </InfoBox>
      <div>
        <H2>What gets used</H2>
        <p className="mt-4 leading-relaxed text-muted">
          The AI reads the target user&apos;s activity patterns - what they log, how
          often, how long, and any streaks or gaps. The roast is always meant to
          be lighthearted. No personal details beyond activity data are used.
        </p>
      </div>
      <Divider />
      <div>
        <H2>Does the target need to be linked?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Yes - the roasted user must have their Discord account linked to
          GamiLife. If they&apos;re not linked, the bot will say so.
        </p>
      </div>
    </div>
  );
}

/* ---------- Account & Settings ---------- */

function DeleteAccountContent() {
  return (
    <div className="space-y-10">
      <p className="text-lg leading-relaxed text-muted">
        You have full control over your account and data. There are two ways
        to permanently delete your GamiLife account.
      </p>

      <NumBox n="1" title="Delete directly in the app">
        The fastest way. Open GamiLife, go to{" "}
        <strong className="text-text">Settings → Account</strong>, and tap{" "}
        <strong className="text-text">Delete Account</strong>. Your account and all
        associated data are permanently removed immediately.
      </NumBox>

      <NumBox n="2" title="Request deletion by email">
        <p>
          If you can&apos;t access the app or prefer to request deletion manually,
          send us an email and we&apos;ll handle it for you.
        </p>
        <div className="mt-5 rounded-xl border border-border bg-surface-2 px-5 py-4 text-[15px] leading-relaxed text-text">
          To delete your account, email{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>{" "}
          and we&apos;ll process your request within 30 days.
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Please send the request from the email address associated with your
          account so we can verify ownership.
        </p>
      </NumBox>

      <div className="border-t border-border pt-8">
        <H2>What gets deleted</H2>
        <div className="mt-4 space-y-3 leading-relaxed text-muted">
          <p>
            Deleting your account permanently removes your profile, username,
            goals, sessions, posts, XP history, uploaded images, and all other
            personal data we hold. This action cannot be undone.
          </p>
          <p>
            We may retain certain records for a limited period where required
            by law, but your personal information is removed from our active
            systems within 30 days of your request.
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <H2>Questions?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Reach out at{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>{" "}
          and we&apos;ll get back to you.
        </p>
      </div>
    </div>
  );
}

function ChangePasswordContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife sends a password reset email rather than letting you change
        your password directly in the app - this keeps your account secure even
        if someone else has your device open.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open Settings">
          Tap your avatar or go to <strong className="text-text">Settings</strong>.
        </NumBox>
        <NumBox n="2" title="Tap Change Password">
          Find the <strong className="text-text">Change Password</strong> button and
          tap it.
        </NumBox>
        <NumBox n="3" title="Check your email">
          A password reset link is sent to the email address on your account.
          Open the email and follow the link to set a new password.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Didn&apos;t receive the email?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Check your spam folder. If it&apos;s not there, try again after a minute or
          contact{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function EditProfileContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        You can update your display name, personal title, bio, and profile
        picture at any time.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Open Settings">
          Tap your avatar or go to <strong className="text-text">Settings</strong>.
        </NumBox>
        <NumBox n="2" title="Tap Edit Profile">
          Tap <strong className="text-text">Edit Profile</strong> to open the profile
          editor.
        </NumBox>
        <NumBox n="3" title="Update and save">
          Change your <strong className="text-text">display name</strong> (max 15
          characters), <strong className="text-text">personal title</strong>,{" "}
          <strong className="text-text">bio</strong>, or{" "}
          <strong className="text-text">profile picture</strong>. Tap{" "}
          <strong className="text-text">Save</strong> when done.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Can I change my username?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Username changes are not available from the profile editor. If you
          need to change your username, contact{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function NotificationsSettingsContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife sends notifications for things like new followers, likes,
        comments, and nudges received during sessions.
      </p>
      <Box>
        <H2>Turning notifications on or off</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Go to <strong className="text-text">Settings</strong> and toggle the{" "}
          <strong className="text-text">Notifications</strong> setting between On and
          Off. This controls in-app notifications globally.
        </p>
      </Box>
      <Divider />
      <div>
        <H2>Notification types</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>New follower</li>
          <li>Like on a post</li>
          <li>Comment on a post</li>
          <li>Nudge received during a live session</li>
        </ul>
      </div>
    </div>
  );
}

/* ---------- Help & Support ---------- */

function ContactSupportContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        The GamiLife support team is available by email for any issues,
        questions, or feedback.
      </p>
      <InfoBox>
        Email us at{" "}
        <a href="mailto:support@gamilife.com" className={lc}>
          support@gamilife.com
        </a>
        . Include your username and a description of the issue.
      </InfoBox>
      <div>
        <H2>Response time</H2>
        <p className="mt-4 leading-relaxed text-muted">
          We aim to respond within 1–3 business days. For account deletion
          requests, processing takes up to 30 days.
        </p>
      </div>
      <Divider />
      <div>
        <H2>Community support</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You can also ask questions and get help from other GamiLife users in
          the official Discord community. The team is active there as well.
        </p>
      </div>
    </div>
  );
}

function ReportBugContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        If you encounter a bug or something that doesn&apos;t work as expected, let
        us know so we can fix it.
      </p>
      <div className="space-y-5">
        <NumBox n="1" title="Describe the problem">
          Note what you were doing when it happened, what you expected to see,
          and what actually occurred.
        </NumBox>
        <NumBox n="2" title="Include your device and version">
          Tell us your device type (iOS, Android, web browser) and, if
          possible, the app version.
        </NumBox>
        <NumBox n="3" title="Send it to us">
          Email{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>{" "}
          with the subject line &quot;Bug Report&quot; and your description.
        </NumBox>
      </div>
      <Divider />
      <div>
        <H2>Crash reporting</H2>
        <p className="mt-4 leading-relaxed text-muted">
          GamiLife automatically collects crash reports (device type, OS
          version, app version, and error traces) to help us find and fix bugs
          proactively. No content from your goals or sessions is included in
          crash reports.
        </p>
      </div>
    </div>
  );
}

function DataAndPrivacyContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Here&apos;s a summary of how GamiLife handles your data. For the full
        details, read our{" "}
        <Link to="/privacy-policy" className={lc}>
          Privacy Policy
        </Link>
        .
      </p>
      <Box>
        <H2>What we store</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Your account information (email, username, display name)</li>
          <li>Goals, sessions, and XP history you create</li>
          <li>Profile picture and any images uploaded to posts</li>
          <li>Notifications and social activity (follows, likes, comments)</li>
        </ul>
      </Box>
      <Box>
        <H2>Analytics and crash reporting</H2>
        <p className="mt-4 leading-relaxed text-muted">
          We collect usage analytics and automatic crash reports to improve the
          app. Crash reports include technical details like device type, OS
          version, and error stack traces. No personal content from your goals
          or sessions is included.
        </p>
      </Box>
      <Divider />
      <div>
        <H2>Deleting your data</H2>
        <p className="mt-4 leading-relaxed text-muted">
          You can permanently delete your account and all associated data at any
          time. See our{" "}
          <Link to="/delete-account" className={lc}>
            account deletion page
          </Link>{" "}
          for instructions.
        </p>
      </div>
    </div>
  );
}

function TroubleshootContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        Most GamiLife issues can be resolved with one of the steps below.
      </p>
      <Box>
        <H2>Can&apos;t log in</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Make sure you&apos;re using the correct email address and password</li>
          <li>Try resetting your password from Settings → Change Password</li>
          <li>Check your internet connection</li>
          <li>If the problem persists, email <a href="mailto:support@gamilife.com" className={lc}>support@gamilife.com</a></li>
        </ul>
      </Box>
      <Box>
        <H2>Session not saving</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Make sure you tapped <strong className="text-text">Complete Session</strong> and saw the Reflection screen</li>
          <li>Check your internet connection - sessions sync to the server on completion</li>
          <li>If a session completed but doesn&apos;t appear in your history, wait a minute and refresh the page</li>
        </ul>
      </Box>
      <Box>
        <H2>XP didn&apos;t update</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Pull to refresh on the Goals or Profile page</li>
          <li>XP is credited when the session is marked complete - abandoned sessions earn reduced or no XP</li>
        </ul>
      </Box>
      <Divider />
      <div>
        <H2>Still stuck?</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Email{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>{" "}
          with your username and a description of the problem.
        </p>
      </div>
    </div>
  );
}

/* ---------- About GamiLife ---------- */

function MissionContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife exists to make real self-growth feel as engaging as a game.
      </p>
      <div>
        <H2>The problem we&apos;re solving</H2>
        <p className="mt-4 leading-relaxed text-muted">
          Most productivity apps treat all effort as equal - a checked checkbox
          gives the same feedback whether you spent two minutes or two hours.
          GamiLife rewards the context and depth of real focused work, not just
          activity counts.
        </p>
      </div>
      <Box>
        <H2>What sets GamiLife apart</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>XP is earned based on session context and focused duration, not vanity metrics</li>
          <li>Growth is tracked across five distinct life aspects, not a single score</li>
          <li>Long-term Mastery Titles reward sustained commitment in a path</li>
          <li>Optional social accountability through follows, nudges, and leaderboards</li>
          <li>Backed by habit-building science: immediate feedback, visible progress, identity-based behavior</li>
        </ul>
      </Box>
    </div>
  );
}

function ScienceContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife applies ideas from modern habit research and behavioral
        psychology to make self-improvement more sustainable.
      </p>
      <Box>
        <H2>Key principles behind GamiLife</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <strong className="text-text">Immediate feedback</strong> - XP awarded
            right after a session reinforces the behavior immediately
          </li>
          <li>
            <strong className="text-text">Visible progress</strong> - levels, charts,
            and aspect progress make growth tangible rather than abstract
          </li>
          <li>
            <strong className="text-text">Identity-based behavior</strong> - Mastery
            Titles align your in-app identity with the person you&apos;re working to
            become
          </li>
          <li>
            <strong className="text-text">Adaptive difficulty</strong> - the AI
            reads context rather than applying fixed XP per minute, so harder
            or more focused work earns proportionally more
          </li>
          <li>
            <strong className="text-text">Social accountability</strong> - an opt-in
            social layer lets you share progress and receive nudges from others
            who are rooting for you
          </li>
        </ul>
      </Box>
      <Divider />
      <div>
        <H2>The Pomodoro technique</H2>
        <p className="mt-4 leading-relaxed text-muted">
          GamiLife&apos;s session timer uses the Pomodoro technique (25-minute focus
          blocks, 5-minute breaks) because it is one of the most well-studied
          methods for sustaining deep attention without burnout.
        </p>
      </div>
    </div>
  );
}

function RoadmapContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife V1 is actively rolling out. The team is focused on
        stabilising the core experience before expanding features.
      </p>
      <Box>
        <H2>What&apos;s live now</H2>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>Goals and timed sessions with AI XP distribution</li>
          <li>Five-aspect growth profile with radar charts</li>
          <li>Mastery Titles and Achievements</li>
          <li>Feed, following, likes, comments, and nudges</li>
          <li>Leaderboards (overall and per-mastery-path)</li>
          <li>Discord bot with stats, profiles, and live activity feed</li>
          <li>Public and private account modes</li>
        </ul>
      </Box>
      <Divider />
      <div>
        <H2>Share feedback</H2>
        <p className="mt-4 leading-relaxed text-muted">
          The best place to share ideas and feature requests is the official
          Discord community. The team reads every suggestion. You can also email{" "}
          <a href="mailto:support@gamilife.com" className={lc}>
            support@gamilife.com
          </a>{" "}
          directly.
        </p>
      </div>
    </div>
  );
}

/* ---------- Legal ---------- */

function LegalPrivacyContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife&apos;s Privacy Policy explains what data we collect, how we use it,
        and your rights as a user.
      </p>
      <InfoBox>
        <Link to="/privacy-policy" className={lc}>
          Read the full Privacy Policy →
        </Link>
      </InfoBox>
      <Box>
        <H2>Key points</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>We collect account info, goals, sessions, and usage analytics</li>
          <li>Crash reports include technical details but no personal goal content</li>
          <li>You can delete your account and all associated data at any time</li>
          <li>We do not sell your data to third parties</li>
        </ul>
      </Box>
    </div>
  );
}

function LegalTermsContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        GamiLife&apos;s Terms of Service set out the rules for using the app and
        your rights and responsibilities as a user.
      </p>
      <InfoBox>
        <Link to="/terms-of-service" className={lc}>
          Read the full Terms of Service →
        </Link>
      </InfoBox>
      <Box>
        <H2>Key points</H2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>You must be at least 13 years old to use GamiLife</li>
          <li>Log sessions honestly - XP manipulation violates these terms</li>
          <li>You retain ownership of your content; GamiLife may display it to provide the service</li>
          <li>You can delete your account at any time from Settings or by email</li>
        </ul>
      </Box>
    </div>
  );
}

function LegalDeleteContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg leading-relaxed text-muted">
        You can permanently delete your GamiLife account and all associated
        data at any time, for any reason.
      </p>
      <InfoBox>
        <Link to="/delete-account" className={lc}>
          Read the full Account Deletion page →
        </Link>
      </InfoBox>
      <div className="space-y-5">
        <Box>
          <H2>In the app</H2>
          <p className="mt-3 leading-relaxed text-muted">
            Go to <strong className="text-text">Settings → Account → Delete Account</strong>.
            Your account and data are removed immediately.
          </p>
        </Box>
        <Box>
          <H2>By email</H2>
          <p className="mt-3 leading-relaxed text-muted">
            Email{" "}
            <a href="mailto:support@gamilife.com" className={lc}>
              support@gamilife.com
            </a>{" "}
            from the address linked to your account. We&apos;ll process the request
            within 30 days.
          </p>
        </Box>
      </div>
    </div>
  );
}

/* ─── STRUCTURE ──────────────────────────────────────────────────────────── */

const STRUCTURE = [
  {
    slug: "getting-started",
    title: "Getting Started",
    articles: [
      {
        slug: "what-is-gamilife",
        title: "What is GamiLife?",
        description: "An overview of GamiLife - what it does, how XP works, and the five life aspects.",
        content: <WhatIsGamiLifeContent />,
      },
      {
        slug: "how-to-register",
        title: "How to create an account",
        description: "Step-by-step guide to registering for GamiLife.",
        content: <HowToRegisterContent />,
      },
      {
        slug: "guided-tour",
        title: "Guided Tour",
        description: "What the Guided Tour covers and how to start or restart it.",
        content: <GuidedTourContent />,
      },
      {
        slug: "xp-explained",
        title: "XP explained",
        description: "How GamiLife calculates and awards XP for sessions.",
        content: <XpExplainedContent />,
      },
      {
        slug: "mastery-titles",
        title: "Mastery Titles",
        description: "The five Mastery Titles, what they represent, and how to earn them.",
        content: <MasteryTitlesContent />,
      },
      {
        slug: "achievements",
        title: "Achievements",
        description: "How Achievements work and where to see them.",
        content: <AchievementsContent />,
      },
    ],
  },
  {
    slug: "goals",
    title: "Goals",
    articles: [
      {
        slug: "create-a-goal",
        title: "Create a goal",
        description: "How to create a new goal in GamiLife - fields, options, and what happens next.",
        content: <CreateGoalContent />,
      },
      {
        slug: "goal-status",
        title: "Goal statuses",
        description: "The five goal statuses and how to change them.",
        content: <GoalStatusContent />,
      },
      {
        slug: "edit-a-goal",
        title: "Edit a goal",
        description: "How to update a goal's title, description, or finish-by date.",
        content: <EditGoalContent />,
      },
      {
        slug: "delete-a-goal",
        title: "Delete a goal",
        description: "How to permanently delete a goal and what happens to its sessions.",
        content: <DeleteGoalContent />,
      },
    ],
  },
  {
    slug: "sessions",
    title: "Sessions & Tracking",
    articles: [
      {
        slug: "start-a-session",
        title: "Start a session",
        description: "How to start a timed session from a goal or activity page.",
        content: <StartSessionContent />,
      },
      {
        slug: "pause-a-session",
        title: "Pause and resume",
        description: "How to pause a live session and what happens to your XP when paused.",
        content: <PauseSessionContent />,
      },
      {
        slug: "complete-a-session",
        title: "Complete or abandon a session",
        description: "How to end a session, what the Reflection screen shows, and the difference between completing and abandoning.",
        content: <CompleteSessionContent />,
      },
      {
        slug: "focus-break-cycle",
        title: "Focus and break cycle",
        description: "How GamiLife's Pomodoro-style 25/5 cycle works and why only focus time earns XP.",
        content: <PomodoroContent />,
      },
    ],
  },
  {
    slug: "activities",
    title: "Activities",
    articles: [
      {
        slug: "what-are-activities",
        title: "What are activities?",
        description: "How activities define session type and affect XP distribution across aspects.",
        content: <WhatAreActivitiesContent />,
      },
      {
        slug: "create-an-activity",
        title: "Create a custom activity",
        description: "How to add a new activity that isn't in GamiLife's built-in library.",
        content: <CreateActivityContent />,
      },
      {
        slug: "activity-leaderboards",
        title: "Activity leaderboards and live sessions",
        description: "How to view per-activity rankings and see who is currently working on something.",
        content: <ActivityLeaderboardContent />,
      },
    ],
  },
  {
    slug: "social",
    title: "Social & Community",
    articles: [
      {
        slug: "feed",
        title: "Your feed",
        description: "What appears in the GamiLife feed and how to interact with posts.",
        content: <FeedContent />,
      },
      {
        slug: "following",
        title: "Following and unfollowing",
        description: "How to follow someone and what following does.",
        content: <FollowingContent />,
      },
      {
        slug: "profile",
        title: "Your profile",
        description: "What's on your GamiLife profile and how to edit it.",
        content: <ProfilePageContent />,
      },
      {
        slug: "leaderboards",
        title: "Leaderboards",
        description: "The types of leaderboards in GamiLife and how to access them.",
        content: <LeaderboardContent />,
      },
      {
        slug: "privacy",
        title: "Public vs Private account",
        description: "How to control who can see your profile and posts.",
        content: <PrivacyContent />,
      },
    ],
  },
  {
    slug: "discord-bot",
    title: "Discord Bot",
    articles: [
      {
        slug: "link-discord",
        title: "Link your Discord account",
        description: "How to connect your Discord account to GamiLife using the /link command.",
        content: <LinkDiscordContent />,
      },
      {
        slug: "bot-commands",
        title: "All bot commands",
        description: "Full reference for every GamiLife Discord bot slash command.",
        content: <BotCommandsContent />,
      },
      {
        slug: "activity-feed",
        title: "Live activity feed",
        description: "How the bot posts live session updates to Discord automatically.",
        content: <ActivityFeedContent />,
      },
      {
        slug: "bored-command",
        title: "/bored - get a suggestion",
        description: "How the /bored command picks an activity suggestion based on your goals.",
        content: <BoredCommandContent />,
      },
      {
        slug: "roast-command",
        title: "/roast - AI roast",
        description: "How the /roast command generates a playful AI roast based on activity history.",
        content: <RoastCommandContent />,
      },
    ],
  },
  {
    slug: "your-account",
    title: "Account & Settings",
    articles: [
      {
        slug: "how-to-delete-account",
        title: "How to delete your account",
        description: "Two ways to permanently remove your GamiLife account and data.",
        content: <DeleteAccountContent />,
      },
      {
        slug: "change-password",
        title: "Change your password",
        description: "How to request a password reset email from Settings.",
        content: <ChangePasswordContent />,
      },
      {
        slug: "edit-profile",
        title: "Edit your profile",
        description: "How to update your display name, bio, title, and profile picture.",
        content: <EditProfileContent />,
      },
      {
        slug: "notifications",
        title: "Notifications",
        description: "How to turn notifications on or off and what triggers them.",
        content: <NotificationsSettingsContent />,
      },
    ],
  },
  {
    slug: "help",
    title: "Help & Support",
    articles: [
      {
        slug: "contact-support",
        title: "Contact support",
        description: "How to reach the GamiLife support team.",
        content: <ContactSupportContent />,
      },
      {
        slug: "report-a-bug",
        title: "Report a bug",
        description: "What to include when reporting a bug and how to send it.",
        content: <ReportBugContent />,
      },
      {
        slug: "data-and-privacy",
        title: "Your data and privacy",
        description: "A plain-language summary of how GamiLife handles your data.",
        content: <DataAndPrivacyContent />,
      },
      {
        slug: "troubleshooting",
        title: "Troubleshooting common issues",
        description: "Quick fixes for login problems, sessions not saving, and XP not updating.",
        content: <TroubleshootContent />,
      },
    ],
  },
  {
    slug: "about",
    title: "About GamiLife",
    articles: [
      {
        slug: "mission",
        title: "Our mission",
        description: "Why GamiLife exists and what makes it different from other productivity apps.",
        content: <MissionContent />,
      },
      {
        slug: "science",
        title: "The science behind GamiLife",
        description: "The habit research and behavioral principles that GamiLife is built on.",
        content: <ScienceContent />,
      },
      {
        slug: "roadmap",
        title: "What's live and what's next",
        description: "A summary of features available in GamiLife V1 and how to share feedback.",
        content: <RoadmapContent />,
      },
    ],
  },
  {
    slug: "legal",
    title: "Legal",
    articles: [
      {
        slug: "privacy-policy",
        title: "Privacy Policy",
        description: "Summary and link to the full GamiLife Privacy Policy.",
        content: <LegalPrivacyContent />,
      },
      {
        slug: "terms-of-service",
        title: "Terms of Service",
        description: "Summary and link to the full GamiLife Terms of Service.",
        content: <LegalTermsContent />,
      },
      {
        slug: "account-deletion-policy",
        title: "Account deletion policy",
        description: "How to delete your account and what data is removed.",
        content: <LegalDeleteContent />,
      },
    ],
  },
];

/* ─── Sidebar ────────────────────────────────────────────────────────────── */

function Sidebar({ onClose }) {
  return (
    <nav className="w-full lg:w-60 lg:shrink-0">
      {STRUCTURE.map((category) => (
        <div key={category.slug} className="mb-6">
          <p className="mb-2 text-md font-semibold uppercase tracking-widest text-faint">
            {category.title}
          </p>
          <ul className="space-y-0.5">
            {category.articles.map((article) => (
              <li key={article.slug}>
                <NavLink
                  to={`/faq/${category.slug}/${article.slug}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-surface-2 hover:text-text"
                    }`
                  }
                >
                  {article.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export function FaqPage() {
  const { category: categorySlug, article: articleSlug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const category = STRUCTURE.find((c) => c.slug === categorySlug);
  const article = category?.articles.find((a) => a.slug === articleSlug);

  if (!category || !article) {
    return <Navigate to="/faq/your-account/how-to-delete-account" replace />;
  }

  return (
    <>
      <Seo
        title={`${article.title} - GamiLife Help`}
        description={article.description}
        path={`/faq/${categorySlug}/${articleSlug}`}
        type="WebPage"
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
            GamiLife
          </Link>

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden rounded-lg p-1.5 text-muted transition-colors hover:text-text"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X size={20} /> : <List size={20} />}
            </button>

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-6xl gap-0 px-5 pb-24 pt-10 sm:px-8 lg:gap-12">

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div
              className="absolute left-0 top-16 w-72 border-r border-border bg-bg p-6 shadow-xl overflow-y-auto scrollbar-none"
              style={{ maxHeight: "calc(100dvh - 4rem)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-6rem)] overflow-y-auto pr-2 scrollbar-none">
          
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <p className="mb-6 text-sm text-faint">
            <Link to="/#faq" className="hover:text-muted">FAQ</Link>
            {" / "}
            <span className="text-muted">{category.title}</span>
            {" / "}
            <span className="text-text">{article.title}</span>
          </p>

          <h1 className="font-serif text-3xl font-medium tracking-[-0.02em] text-text sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-8">
            {article.content}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
