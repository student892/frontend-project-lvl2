install:
	npm install

install-deps:
	npm ci

test:
	npm test

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test