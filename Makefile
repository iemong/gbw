all: run lint
lint:
	deno lint main.ts
fmt:
	deno fmt
watch:
	deno run --watch --allow-net --allow-read --allow-write --allow-env --allow-run --unstable main.ts
run:
	deno run --allow-net --allow-read --allow-write --allow-env --allow-run --unstable main.ts
build:
	deno compile --allow-net --allow-read --allow-write --allow-env --allow-run --unstable main.ts
