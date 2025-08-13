const config = {
  URL: process.env.URL,
  API_URL: `${process.env.NEXT_PUBLIC_URL}/${process.env.NEXT_PUBLIC_API_URL}`
} as const;

export default config;
