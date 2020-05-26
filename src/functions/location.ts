import {APIGatewayEvent} from "aws-lambda";
import fetch from "node-fetch";

export const handler = async (event: APIGatewayEvent) => {
    let proxy = false;
    let ip = event.requestContext.identity.sourceIp;

    const q = event.queryStringParameters && event.queryStringParameters.q;

    if (event.headers.HTTP_CLIENT_IP) {
        ip = event.headers.HTTP_CLIENT_IP;
        proxy = true;
    } else if (event.headers.HTTP_X_FORWARDED_FOR) {
        ip = event.headers.HTTP_X_FORWARDED_FOR;
        proxy = true;
    }

    try {
        let location;
        if (q) {
            location = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${q}&format=json&limit=1`)
                .then(r => r.json())
                .then((data: any[]) => {
                    if (data.length > 0) {
                        return {
                            latitude: data[0].lat,
                            longitude: data[0].lon,
                        }
                    }

                    return {};
                });
        } else {
            location = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK}`)
                .then(r => r.json());
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                location: [
                    location.latitude ||  46.055556,
                    location.longitude || 14.508333,
                ],
                proxy,
            }),
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Integration failed"
            })
        }
    }
};
