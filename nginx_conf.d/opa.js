export default { validate, ok }

var fs = require("fs");

function validate(request) {
    request.error("Logging info " + request.requestText)

    var opa_query = {
        input: JSON.parse(request.requestText)
    }

    request.error("Logging info " + JSON.stringify(opa_query))

    request.subrequest("/_send_opa_query", { method: "POST", body: JSON.stringify(opa_query) })
        .then(reply => JSON.parse(reply.responseBody))
        .then(response => handleOpaResponse(request, response))
        .catch(e => r.return(401));
}

function handleOpaResponse(originalRequest, response) {
    if (response.result) {
        originalRequest.error("VALID request body")
        originalRequest.subrequest('/_ok/', originalRequest.variables.args, done(originalRequest))
    } else {
        originalRequest.error("Invalid request body")
        originalRequest.return(403)
    }
}

function done(originalRequest) {
    return function (response) {
        return originalRequest.return(response.status, response.responseBody)
    }
}

function ok(request) {
    request.error("OK Function")
    var response = {
        validation: "OK",
        data: JSON.parse(request.requestText)
    }
    request.return(200, JSON.stringify(response))
}