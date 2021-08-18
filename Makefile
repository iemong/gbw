all: run lint
lint:
	deno lint main.ts
fmt:
	deno fmt
watch:
	deno run --watch --allow-net --allow-read --allow-write --allow-env --allow-run --unstable main.ts
run:
	deno run --allow-all --unstable main.ts
build-x86_64-apple-darwin:
	deno compile --allow-all --unstable --target x86_64-apple-darwin -o gbw-x86_64-apple-darwin main.ts 
build-aarch64-apple-darwin:
	deno compile --allow-all --unstable --target aarch64-apple-darwin -o gbw-aarch64-apple-darwin main.ts 
build:
	@make build-x86_64-apple-darwin
	@make build-aarch64-apple-darwin