# stripe-create-charge

A microservice to charge a credit card using a stripe token retrieved in a client side checkout process.
See https://stripe.com/docs/checkout/tutorial for more details.


## Run

```bash
docker run -it --rm -e STRIPE_SECRET=sk_your_secret -p 8080:8080 marcbachmann/stripe-create-charge
curl -XPOST http://localhost:8080/charge -H 'Content-Type: application/json' -d '{"amount": 1000, "currency": "usd", "description": "some description", "source": "tokenretrievedfromstripe"}'
```
