---
title: Row Level Security in Serverless PostgreSQL for HIPAA Compliance
description: Row Level Security in PostgreSQL isn’t just a neat trick-it’s a practical, scalable way to keep your pharma web app HIPAA-compliant without losing your mind
image: /images/blog/marcos-mayer-locks.jpg
tags: serverless, hipaa, postrgresql, webdev
created: 1744729263
lastUpdated:
---
# Row Level Security in Serverless PostgreSQL for HIPAA Compliance

It's time to revisit everyones two favorite topics, Row Level Security (RLS) and HIPAA compliance. I'm here to give the people what they want, so here is my take on how to create a safe and orderly place for your legally-protected patient data to live. 

If you’re building a patient focused web app and you’re not thinking about HIPAA compliance, you haven't seen the [https://www.ama-assn.org/practice-management/hipaa/hipaa-violations-enforcement#:~:text=HIPAA%20violation:%20Unknowing,imprisonment%20up%20to%201%20year.](penalty structure for violations). For the rest of us, protecting patient data isn’t just a checkbox—it’s a survival skill. 

## What the Heck is Row Level Security, and Why Should You Care?

Row Level Security (RLS) is PostgreSQL’s way of saying, “Welcome, but stay in your assigned space.” Your users become kinda like guests in a hotel, only if door locks were as cool as SQL policies. RLS lets you centralize your access logic, so you can focus on giving your guests a great experience. 

And yeah, it’s a HIPAA win: RLS helps you enforce the “minimum necessary” access rule, so you’re not handing out all the keys when someone just needs access to one room.

## Getting your Hands Dirty with Serverless PostgreSQL

Here’s how you can set up RLS in a serverless PostgreSQL environment (think Neon, Supabase, or AWS Aurora Serverless). I’ll assume you already have a `patients` table, because if you don’t, I'm not sure why you are still here.

### Enable RLS on Your Table

First, you need to tell PostgreSQL to actually care about row-level access. By default, it’s blissfully ignorant.

```sql
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
```

Congratulations, you’ve just hired a beefy database bouncer! But right now, he’s letting everyone in. Let’s fix that.

### Create Policies for Clinicians

Let’s say each patient has a `clinician_id` column. You want clinicians to only see their own patients. Here’s how you do it:

```sql
CREATE POLICY clinician_access ON patients
  FOR SELECT, UPDATE
  USING (clinician_id = current_user::text);
```

This policy says: “If the `clinician_id` matches the current user’s name, let them SELECT or UPDATE.” (Yes, you’ll need to make sure your app sets up users in PostgreSQL with usernames matching `clinician_id`, or use session variables. More on that in a second.)

This lets anyone with the `auditor` role see all rows, but not change a thing. If they want to update, they’ll have to go back to accounting.

### 4. One RLS Policy to Rule Them All

By default, superusers and table owners can bypass RLS. In a serverless setup, you want to make sure naughty users aren’t sneaking around the rules.

```sql
ALTER TABLE patients FORCE ROW LEVEL SECURITY;
```

Now, not even the table owner can bypass your policies. (Take that, creepy snoopers.)

### 5. Serverless Gotchas

Serverless PostgreSQL is stateless, so we can’t rely on sticky sessions or nerd magic. We'll need to establish [PostgreSQL session variables](https://www.postgresql.org/docs/current/runtime-config-client.html) (like `SET SESSION "app.current_user" = 'clinician123';`) at the start of each connection. Our app’s authentication layer should handle this — _don’t trust anyone!_. But since you are cool, here's the deets: 

### The Setup

- **Table:** `patients`
- **Columns:** `id`, `name`, `dob`, `clinician_id`

### Step 1: Enable RLS

```sql
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients FORCE ROW LEVEL SECURITY;
```

### Step 2: Create Clinician Policy

```sql
CREATE POLICY clinician_policy ON patients
  FOR SELECT, UPDATE
  TO dr_smith, dr_jones
  USING (clinician_id = current_setting('app.current_user'));
```

**Step 3: Set the user session variable when connecting:**  
   In your app, after establishing a connection:

```javascript
// Node.js example with pg library
await client.query('SET SESSION "app.current_user" = $1', [userId]);
```

## Conclusion

Row Level Security in PostgreSQL isn’t just a neat trick—it’s a practical, scalable way to remain HIPAA-compliant without losing your mind (or your patients' data). In a serverless world, it’s even more important to simplfy access logic, to prevent unforseen challenges from becoming critical failures. 

With some thoughtful RLS policies, we can let PostgreSQL do the heavy lifting, while we sit back and admire what we accomplished. And if someone asks why you’re so calm about HIPAA audits, just wink and say, _“It’s all in the rows, my friend.”_

**Further Reading:**  
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)  
- [HIPAA Security Rule Summary (HHS.gov)](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)  
- [Serverless PostgreSQL Providers: Neon, Supabase, AWS Aurora](https://neon.tech/), [https://supabase.com/](https://supabase.com/), [https://aws.amazon.com/rds/aurora/serverless/](https://aws.amazon.com/rds/aurora/serverless/)