export default { validate }

var fs = require("fs");

function validate(request) {
    request.error("Logging info ", request.variables.request_body)
    var body = JSON.parse(request.variables.request_body)
    var opa_query = {
        input: body
    }

    request.error("Logging info " + opa_query)

    return request.subrequest("/_send_opa_query", { method: "POST", body: JSON.stringify(opa_query) })
        .then(reply => JSON.parse(reply.responseBody))
        .then(response => {
            if (response.result) {
                request.return(204);
            } else {
                request.return(403);
            }
        })
        .catch(e => r.return(401));
}