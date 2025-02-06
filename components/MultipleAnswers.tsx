"use client";

import React, { useState } from "react";
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
import { AnswerOptionProps, AnswerOptionType, AnswerProps } from "@/lib/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const CheckboxOption: React.FC<AnswerOptionProps> = (props) => {
  const { item, index, field, correctAnswers, formSubmitted, readonly } = props;
  const letter = String.fromCharCode(65 + index);

  function onCheckedChange(
    field: FieldValues,
    checked: CheckedState,
    item: AnswerOptionType
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
          disabled={formSubmitted || readonly}
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
            (formSubmitted || readonly),
          "text-green-500":
            correctAnswers.includes(item.value) && (formSubmitted || readonly),
        })}
      >
        {letter}. {item.label}
      </FormLabel>
    </FormItem>
  );
};

const MultipleAnswers: React.FC<AnswerProps> = (props) => {
  const {
    items,
    examMode,
    questionText,
    correctAnswers,
    userAnswer,
    readonly,
    handleAnswer,
    nextQuestion,
  } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: userAnswer ? userAnswer : [] },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!examMode) {
      setFormSubmitted(true);
    }

    handleAnswer(data.items);

    if (examMode) {
      form.reset();
      nextQuestion();
    }
  }

  function onNext() {
    if (!formSubmitted) {
      return;
    }

    form.reset();
    setFormSubmitted(false);
    nextQuestion();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem key={questionText}>
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
                      readonly={readonly}
                    />
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {!readonly && (
          <Button className="text-xl mr-2" type="submit">
            Submit
          </Button>
        )}

        {!examMode && !readonly && (
          <Button className="text-xl" type="button" onClick={onNext}>
            Next
          </Button>
        )}
      </form>
    </Form>
  );
};

export default MultipleAnswers;
