const stripeSecret = getSecret('STRIPE_SECRET')

const stripe = require('stripe')(stripeSecret)
const fastify = require('fastify')({logger: true})
fastify.use(require('cors')())

fastify.post('/charge', {
  schema: {
    body: {
      type: 'object',
      required: ['amount', 'currency', 'description', 'source'],
      additionalProperties: false,
      properties: {
        amount: {type: 'integer'},
        currency: {type: 'string'},
        description: {type: 'string'},
        source: {type: 'string'}
      }
    }
  }
}, function (req, reply) {
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    description: req.body.description,
    source: req.body.source,
  }, function(err, charge) {
    if (err) reply.code(500).send(err)
    else reply.send(charge)
  })
})

fastify.listen(process.env.PORT || 8080, function (err) {
  if (err) throw err

  const port = fastify.server.address().port
  console.log('Server listening on http://localhost:%s', port)
})

process.on('SIGINT', function () {
  process.exit()
})

function getSecret (name) {
  const fromFile = process.env[`${name}_FILE`]
  let value
  if (!fromFile) {
    value = process.env[name]
  } else {
    try {
      value = require('fs').readFileSync(fromFile, 'utf8')
    } catch (err) {
      throw new Error(`Failed to load the secret from file '${name}_FILE': ${err.message}`)
    }
  }

  if (!value) throw new Error(`The environment variable '${name}' is missing. Please configure it.`)
  return value
}
