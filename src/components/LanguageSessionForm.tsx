"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import {useRouter} from "next/navigation"


const formSchema = z.object({
  scenario: z.string().min(3, {
    message: "Scenario must be at least 3 characters.",
  }).max(500, {
    message: "Scenario must be at less than 500 characters.",
  }),
  voice: z.string(),
  style: z.string(),
  response: z.string(),
  proficiency: z.string(),
  duration: z.number()
})


export default function LanguageSessionForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                scenario: "",
                voice: "male",
                style: "casual",
                response: "brief",
                proficiency: "B1",
                duration: 20
            },
        })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values)
            router.push("/conversation/session")
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="scenario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role-Play Scenario</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., Ordering food at a restaurant, job interview, meeting a new neighbor, booking a vacation resort for a family of 4..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Just a few words is fine - our AI will create the full scenario or type "Random" if you want a random scenario
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <RadioGroup defaultValue={field.value} className="flex" onValueChange={field.onChange}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <RadioGroup defaultValue={field.value} className="flex" onValueChange={field.onChange}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="formal" id="formal" />
                                        <Label htmlFor="formal">Formal</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="casual" id="casual" />
                                        <Label htmlFor="casual">Casual</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="response"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Response Style</FormLabel>
                            <FormControl>
                                <RadioGroup defaultValue={field.value} className="flex" onValueChange={field.onChange}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="brief" id="brief" />
                                        <Label htmlFor="brief">Brief responses</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="detailed" id="detailed" />
                                        <Label htmlFor="detailed">Detailed responses</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="proficiency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proficiency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="A1">Absolute Beginner (A1)</SelectItem>
                                    <SelectItem value="A2">Beginner (A2)</SelectItem>
                                    <SelectItem value="B1">Intermediate (B1)</SelectItem>
                                    <SelectItem value="B2">Advanced (B2)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}