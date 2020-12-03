DROP TABLE IF EXISTS termCommands;

CREATE TABLE termCommands(
    id SERIAL PRIMARY KEY,
    cmd_word VARCHAR(255),
    args VARCHAR(255),
    options VARCHAR(255),
    action_category VARCHAR(255),
    act VARCHAR(255)
);