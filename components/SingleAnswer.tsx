"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { map } from "lodash";
import { FileDiff } from "lucide-react";

const RadioOption = (props) => {
  const { item, index, field } = props;
  const letter = String.fromCharCode(65 + index);

  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem
          value={item.value}
          checked={field.value == item.value}
        />
      </FormControl>
      <FormLabel className="font-normal text-lg">
        {letter} {item.label}
      </FormLabel>
    </FormItem>
  );
};

export default function SingleAnswer(props) {
  const { items, handleAnswer, correctAnswers } = props;
  console.log("rerender");
  const FormSchema = z.object({
    // @ts-ignore
    type: z.enum(map(items, "value"), {
      required_error: "",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    handleAnswer();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1 text-xl"
                >
                  {items.map((item, index) => (
                    <RadioOption
                      key={item + index}
                      item={item}
                      index={index}
                      field={field}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-xl mr-2" type="submit">
          Submit
        </Button>
        <Button className="text-xl">Next</Button>
      </form>
    </Form>
  );
}
