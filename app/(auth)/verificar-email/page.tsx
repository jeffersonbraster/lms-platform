"use client"

import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const VerificarEmailPage = () => {
  const params = useSearchParams()
  const [opt, setOpt] = useState("")
  const [emailPending, startEmailTransition] = useTransition()
  const router = useRouter()
  const emailParams = params.get("email") as string

  const isOptCompleted = opt.length === 6

  function handleVerifyCode() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: emailParams,
        otp: opt,
        fetchOptions: {
          onSuccess: () => {
            toast.success("E-mail verificado com sucesso!")
            router.push("/")
          },
          onError: (error) => {
            toast.error("Erro ao verificar e-mail: " + error.error.message)
          }
        }
      })
    })
  }

  return (
    <Card className='w-full mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle className='text-sl'>Cheque seu e-mail</CardTitle>
        <CardDescription>
          Verifique o código de verificação enviado para o seu e-mail e insira abaixo para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex flex-col items-center space-y-2'>
          <InputOTP maxLength={6} className='gap-2' value={opt} onChange={(value) => setOpt(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className='text-sm text-muted-foreground'>
            Digite com o código de verificação que foi enviado para o seu e-mail.
          </p>

          <Button onClick={handleVerifyCode} disabled={emailPending || !isOptCompleted} className='w-full'>
            {emailPending ? (
              <>
                <Loader2 className='size-4 animate-spin' />
                <span>Validando código..</span>
              </>
            ) : (
              "Validar código"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VerificarEmailPage