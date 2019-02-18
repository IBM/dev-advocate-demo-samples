package rest.demo;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ibm.json.java.JSONObject;


@Path("/v1")
public class RestEndpoints {
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/message/{message}")
    public Response messageSend(@Context final HttpServletRequest request,
                             @PathParam("message") final String message) {
		String returnMessage = "Hello World, your message is: "+message;
		JSONObject msg = new JSONObject();
		msg.put("message",returnMessage);
		return Response.ok(msg).build();

	}
}