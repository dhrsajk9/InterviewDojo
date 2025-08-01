import Vapi from '@vapi-ai/web'

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN
console.log('✅ VAPI Token:', token) // <--- Add this line

export const vapi = new Vapi(token!)
