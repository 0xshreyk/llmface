FROM oven/bun:1.0.1 as builder

WORKDIR /app

COPY package.json bun.lockb /app/

RUN bun install


COPY . .

FROM oven/bun:1.0.1 as runner
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000

CMD ["bun", "run", "dev"]