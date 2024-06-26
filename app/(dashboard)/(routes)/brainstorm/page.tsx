"use client";

import * as z from 'zod';
import Heading from '@/components/heading'
import { Brain } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import OpenAI from 'openai';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';


const Brainstorm = () => {
const router = useRouter();
const [messages, setMessages] = useState<OpenAI.Chat.CreateChatCompletionRequestMessage[]>([]);
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
defaultValues: {
    prompt:""
}
});

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try{
    const userMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
      role: "user",
      content: values.prompt,
    };
    const newMessages = [ ...messages, userMessage];

    const response = await axios.post("/api/brainstorm", {
      messages: newMessages,
    });

    setMessages((current) => [...current, userMessage, response.data]);
    form.reset();
  } catch(error: any){
    console.log(error);
  } finally{
    router.refresh();
  }
}

  return (
    <div className='pt-[5rem]'>
        <Heading
        title="Brainstorm"
        description="Using Generative AI technology, you can now have new content insights"
        icon={Brain}
        iconColor="text-black-500"
        bgColor="bg-slate-500/10"
      />
      <div className='px-4 lg:px-8 mt-4'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
                <FormField name='prompt' render={({ field}) => (
                    <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder='Give me some ideas on what is trending on instagram' {...field}/>
                    </FormControl>
                    </FormItem>)} />
                    <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>

            </form>
        </Form>
      </div>
      <div className='space-y-4 mt-4 '>
        {isLoading && (
          <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <div>
            <Empty label='No conversation started.' />
          </div>
        )}
        <div className='flex flex-col-reverse gap-y-4 '>
        {messages.map((message, index) => {
          // Render message.content directly if it's a string
          if (typeof message.content === 'string') {
            return <div key={index}
            className={cn(
              " mx-8 p-8 w-fill flex items-center gap-x-8 rounded-lg ",
              message.role === "user" ? "bg-white border border-black/10 " : "bg-muted"
            )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className='text-sm'>{message.content}</p>
            </div>;
          }
          else if (Array.isArray(message.content)) {
            return (
              <div key={index}>
                {message.content.map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    {/* Render your ChatCompletionContentPart here */}
                  </React.Fragment>
                ))}
              </div>
            );
          } else {
            return <div key={index}>Unsupported message format</div>;
          }
        })}
        </div>
      </div>

    </div>
  )
}

export default Brainstorm
