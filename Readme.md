# Example requests

- Add policy `curl -X PUT http://localhost:8181/v1/policies/basic --data-binary @basic-allow.rego`
- Send request to be validated `curl -XPOST http://localhost:8181/v1/data/basic/allow --data-binary '{"secretword":"hell"}'`