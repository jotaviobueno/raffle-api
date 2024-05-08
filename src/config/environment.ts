export const environment = {
  DATABASE_URL: process.env.DATABASE_URL,
  //
  REDIS_PORT: process.env.REDIS_PORT,
  //
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  //
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
  AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET,
  AWS_REGION: process.env.AWS_REGION,
  //
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  //
  NODE_ENV: process.env.NODE_ENV,
  VERSION: process.env.npm_package_version,
  //
  ASAAS_INTEREST: process.env.ASAAS_INTEREST,
  ASAAS_FINE: process.env.ASAAS_FINE,
  ASAAS_ACCESS_TOKEN: process.env.ASAAS_ACCESS_TOKEN,
  //
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};
