export const environment = {
  DATABASE_URL: process.env.DATABASE_URL,
  //
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  //
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  //
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
  AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  //
  VERSION: process.env.npm_package_version,
};
