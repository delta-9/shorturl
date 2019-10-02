.PHONY: list

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

start:
	docker-compose -f docker-compose.test.yml up --build -d; \
	sleep 15; \
	open http://localhost:9556; \
	docker-compose -f docker-compose.test.yml logs -f --tail=1000


stop:
	docker-compose -f docker-compose.test.yml down;