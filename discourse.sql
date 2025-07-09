CREATE TABLE users (
  user_id varchar PRIMARY KEY,
  created_at timestamp DEFAULT now()
);

CREATE TABLE discourse (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id varchar UNIQUE NOT NULL,
  user_id varchar NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  session_type varchar NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  feedback text NOT NULL,
  duration integer NOT NULL,
  language varchar,
  proficiency_level varchar,
  formality varchar,
  role_scenario text,
  target_vocabulary text[],
  created_at timestamp DEFAULT now(),
  CONSTRAINT valid_duration CHECK (duration > 0 AND duration <= 3600),
  CONSTRAINT valid_session_type CHECK (session_type IN ('language_tutor', 'brainstorming'))
);

CREATE TABLE user_vocabulary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  language varchar NOT NULL,
  word varchar NOT NULL,
  translation varchar NOT NULL,
  part_of_speech varchar,
  source varchar NOT NULL,
  source_session_id varchar,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, language, word)
);

CREATE TABLE quiz_question_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  language varchar NOT NULL,
  question_text jsonb NOT NULL,
  quiz_type varchar NOT NULL,
  key_words jsonb NOT NULL,
  high_score integer NOT NULL DEFAULT 0,
  created_at timestamp DEFAULT now()
);

CREATE INDEX idx_discourse_user_id ON discourse(user_id);
CREATE INDEX idx_discourse_created_at ON discourse(created_at);
CREATE INDEX idx_discourse_session_type ON discourse(session_type);
CREATE INDEX idx_discourse_language ON discourse(language);

CREATE INDEX idx_user_vocabulary_user_language ON user_vocabulary(user_id, language);
CREATE INDEX idx_user_vocabulary_source ON user_vocabulary(source);

CREATE INDEX idx_quiz_question_history_user_id ON quiz_question_history(user_id);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE discourse ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_question_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own data" ON users
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can only access their own discourse" ON discourse
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can only access their own vocabulary" ON user_vocabulary
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can only access their own quiz history" ON quiz_question_history
  FOR ALL USING (auth.jwt() ->> 'sub' = user_id);
