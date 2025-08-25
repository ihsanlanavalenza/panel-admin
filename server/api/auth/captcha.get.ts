// server/api/auth/captcha.get.ts
const captchaMap = new Map<string, number>()

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default defineEventHandler(async () => {
  const a = randomInt(1, 9)
  const b = randomInt(1, 9)
  const op = Math.random() > 0.5 ? '+' : '-'
  const question = `${a} ${op} ${b}`
  const answer = op === '+' ? a + b : a - b
  const captchaId = Math.random().toString(36).substring(2, 10)
  captchaMap.set(captchaId, answer)
  setTimeout(() => captchaMap.delete(captchaId), 5 * 60 * 1000) // expire 5 menit
  return { captchaId, question }
})

export function verifyCaptcha(captchaId: string, answer: number) {
  const valid = captchaMap.get(captchaId) === answer
  if (valid) captchaMap.delete(captchaId)
  return valid
}
