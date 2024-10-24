import winston from "winston";
import moment from "moment-timezone";

const { printf } = winston.format;

const customFormat = printf(({ timestamp, level, message, ...meta }) => {
  const metaString = JSON.stringify(meta, null, 2); // Pretty-print metadata
  return `------------------------------
Timestamp : ${timestamp}
Level     : ${level.toUpperCase()}
Message   : ${message}
Metadata  : ${metaString}
------------------------------
`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss A"),
    }),
    customFormat
  ),
});

if (Bun.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    })
  );
  logger.add(new winston.transports.File({ filename: "./logs/combined.log" }));
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () =>
            moment().tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss A"),
        }),
        customFormat
      ),
    })
  );
}

export default logger;
