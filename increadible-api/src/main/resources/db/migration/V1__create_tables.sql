CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    goal VARCHAR(255)
);

CREATE TABLE reflections (
    reflection_id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    tidbit VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL
);

ALTER TABLE reflections ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id);
