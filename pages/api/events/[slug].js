// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { events } = require('./data.json')

export default function handler(req, res) {
  const evt = events.filter(ev => ev.slug === req.query.slug)
  console.log(evt)
  if(req.method === 'GET' && evt.length > 0){
    res.status(200).json(evt)
  }else {
    res.setHeader('Allow', ['GET'])
    if (evt.length === 0 && req.method === 'GET'){
      res.status(404).json({message: `${req.query.slug} is not found`})
    } else {
      res.status(405).json({message: `Method ${req.method} don't allowed!`})
    }
  }
}
