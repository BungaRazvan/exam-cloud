"use client";

import React, { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnswerOptionProps, AnswerOptionItem, AnswerProps } from "@/lib/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const CheckboxOption: React.FC<AnswerOptionProps> = (props) => {
  const { item, index, field, correctAnswers, formSubmitted } = props;
  const letter = String.fromCharCode(65 + index);

  function onCheckedChange(
    field: FieldValues,
    checked: CheckedState,
    item: AnswerOptionItem
  ) {
    let arr;

    if (checked) {
      if (field.value) {
        arr = [...field.value, item.value];
      } else {
        arr = [item.value];
      }
    } else {
      arr = field.value?.filter((value: string) => value !== item.value);
    }

    field.onChange(arr);
  }

  return (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          disabled={formSubmitted}
          checked={field.value?.includes(item.value)}
          onCheckedChange={(checked) => {
            onCheckedChange(field, checked, item);
          }}
        />
      </FormControl>
      <FormLabel
        className={cn("font-normal text-lg", {
          "text-red-500":
            field.value?.includes(item.value) &&
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

const MultipleAnswers: React.FC<AnswerProps> = (props) => {
  const { items, handleAnswer, correctAnswers, nextQuestion } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitted(true);

    handleAnswer(data.items);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {items.map((item, index) => (
                <FormField
                  key={item.value + index}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <CheckboxOption
                      item={item}
                      index={index}
                      field={field}
                      correctAnswers={correctAnswers}
                      formSubmitted={formSubmitted}
                    />
                  )}
                />
              ))}
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

export default MultipleAnswers;
