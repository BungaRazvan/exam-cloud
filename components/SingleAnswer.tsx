"use client";

import React, { FormEvent, useState } from "react";
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
import { AnswerOptionProps, AnswerProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const RadioOption: React.FC<AnswerOptionProps> = (props) => {
  const { item, index, field, correctAnswers, formSubmitted } = props;
  const letter = String.fromCharCode(65 + index);

  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem
          disabled={formSubmitted}
          value={item.value}
          checked={field.value == item.value}
        />
      </FormControl>
      <FormLabel
        className={cn("font-normal text-lg", {
          "text-red-500":
            field.value &&
            item.value == field.value &&
            !correctAnswers.includes(item.value) &&
            formSubmitted,
          "text-green-500":
            correctAnswers.includes(item.value) && formSubmitted,
        })}
      >
        {letter}. {item.label}
      </FormLabel>
    </FormItem>
  );
};

const SingleAnswer: React.FC<AnswerProps> = (props) => {
  const { items, handleAnswer, correctAnswers, nextQuestion } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const FormSchema = z.object({
    // @ts-ignore
    type: z.enum(map(items, "value"), {
      required_error: "Please Choose one option",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitted(true);

    handleAnswer([data.type]);
  }

  function onNext(e: FormEvent) {
    e.preventDefault();

    if (!formSubmitted) {
      return;
    }

    setFormSubmitted(false);
    nextQuestion();
    form.reset();
  }

  return (
    <Form {...form}>
      {/* @ts-ignore */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      key={item.value + index}
                      item={item}
                      index={index}
                      field={field}
                      correctAnswers={correctAnswers}
                      formSubmitted={formSubmitted}
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

        <Button className="text-xl" onClick={onNext}>
          Next
        </Button>
      </form>
    </Form>
  );
};

export default SingleAnswer;
