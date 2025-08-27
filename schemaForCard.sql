-- Decks
id          UUID (PK)
user_id     UUID (FK -> users.id)
name        TEXT
created_at  TIMESTAMP

-- Cards
id          UUID (PK)
deck_id     UUID (FK -> decks.id)
front       TEXT  -- word/question
back        TEXT  -- translation/answer
created_at  TIMESTAMP

CREATE TABLE cards (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  front TEXT,         -- word/phrase
  back TEXT,          -- translation
  due_date DATE,      -- next review date
  interval INT,       -- days until next review
  ease_factor FLOAT,  -- growth multiplier
  created_at TIMESTAMP DEFAULT NOW()
);

-- reviews (per card, per user progress)
id              UUID (PK)
card_id         UUID (FK -> cards.id)
user_id         UUID (FK -> users.id)
interval_days   INT DEFAULT 1       -- current gap until next review
ease_factor     FLOAT DEFAULT 2.5   -- how "easy" the card is for user (used to expand interval)
due_date        DATE                -- when next review should happen, default current date + 1
streak          INT DEFAULT 0       -- how many times correct in a row
last_reviewed   TIMESTAMP

-- Step 1: Get Today’s Due Cards (capped)
SELECT *
FROM cards
WHERE user_id = 'USER_ID_HERE'
  AND due_date <= CURRENT_DATE
ORDER BY due_date ASC, created_at ASC
LIMIT 20;   -- 👈 this is the user’s daily limit

-- When User Reviews a Card
UPDATE cards
SET 
  interval = CASE 
               WHEN 'easy' = 'easy' THEN interval * 2        -- double the gap
               WHEN 'easy' = 'medium' THEN GREATEST(interval, 3)
               WHEN 'easy' = 'hard' THEN 1
             END,
  due_date = CURRENT_DATE + 
             CASE 
               WHEN 'easy' = 'easy' THEN (interval * 2)
               WHEN 'easy' = 'medium' THEN 3
               WHEN 'easy' = 'hard' THEN 1
             END
WHERE id = 'CARD_ID_HERE';

-- Simple rule:

--     Easy → interval doubles (7 → 14 days).

--     Medium → 3 days.

--     Hard → 1 day.


-- Step 4 (Optional): Stats
-- To show "20 due today / 80 overdue total":
SELECT 
  COUNT(*) FILTER (WHERE due_date <= CURRENT_DATE) AS due_total,
  COUNT(*) FILTER (WHERE due_date <= CURRENT_DATE) AS overdue_total
FROM cards
WHERE user_id = 'USER_ID_HERE';

-- 🔁 Review Algorithm

-- When user reviews a card:

-- Hard:

--     interval_days = 1 (or small reset)

--     ease_factor = max(1.3, ease_factor - 0.2)

--     streak = 0

-- Medium:

--     interval_days = round(interval_days * (ease_factor - 1))

--     ease_factor = ease_factor (unchanged)

--     streak += 1

-- Easy:

--     interval_days = round(interval_days * ease_factor)

--     ease_factor += 0.1

--     streak += 1

-- Then set due_date = NOW() + interval_days.


-- Review today limit (create settings page where user can edit how frequent they want the review to be, and how many cards they want to review per day)
--  retrieve all cards due_date <= today, order by created_at, retrieve the first (number of review cards set by user), don't update the remaining cards due date 
--  you can then show, number of cards due today

Perfect 👍 let’s lock this down clean and minimal.
Here’s how you can do **New + Due only (no Learn)** while leaving the door open for adding it later:

---

## 📌 Schema (simplified MVP)

```sql
-- Decks table
CREATE TABLE decks (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Vocabulary (flashcards)
CREATE TABLE cards (
  id UUID PRIMARY KEY,
  deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,  -- e.g. "hola"
  back TEXT NOT NULL,   -- e.g. "hello"
  created_at TIMESTAMP DEFAULT now(),
  
  -- Spaced repetition fields
  status TEXT DEFAULT 'new', -- 'new' or 'review'
  next_review TIMESTAMP,     -- when this card is due
  interval_days INT DEFAULT 0,  -- current gap between reviews
  ease_factor FLOAT DEFAULT 2.5 -- multiplier for growth, optional
);
```

---

## 📌 Algorithm (super simple)

When user reviews a card:

* If **Easy** → interval = max(1, interval\_days \* 2) → next\_review = today + interval
* If **Medium** → interval = max(1, interval\_days + 1) → next\_review = today + interval
* If **Hard** → interval = 1 → next\_review = today + 1

Then set `status = 'review'`.

---

## 📌 Daily Review Process

1. At start of the day, query:

   ```sql
   SELECT * FROM cards 
   WHERE next_review <= today
   ORDER BY created_at
   LIMIT {user_daily_limit};
   ```
2. Show those cards.
3. Skip “learn” entirely → cards either:

   * Not seen yet → `status = new`
   * Seen before → `status = review`

---

## 📌 Extending Later (if you want Learn)

You’d just add:

```sql
ALTER TABLE cards ADD COLUMN learning_step INT DEFAULT 0;
ALTER TABLE cards ADD COLUMN is_learning BOOLEAN DEFAULT false;
```

And update algorithm to handle “steps” before promoting card to `review`.

---

⚡ TL;DR
MVP = `new` + `review` only, no `learn`.
Algorithm = Easy (double), Medium (add 1), Hard (reset to 1).
Schema = super lean but extensible.

---

👉 Do you want me to also draft the **flowchart of user actions** (New → First Review → Next Reviews) so you can visualize it more easily?
