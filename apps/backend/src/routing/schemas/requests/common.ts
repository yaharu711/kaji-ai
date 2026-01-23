import dayjs from "dayjs";
import { z } from "zod";

const isoJstRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/;

export const isoJstDateTimeString = (fieldLabel: string) =>
  z
    .string()
    .refine(
      (value) => isoJstRegex.test(value) && dayjs(value).isValid(),
      `${fieldLabel} は ISO8601 の JST 形式で指定してください`,
    );

const dateOnlyRegex = /^\d{4}[/-]\d{2}[/-]\d{2}$/;

export const dateOnlyString = (fieldLabel: string) =>
  z
    .string()
    .refine(
      (value) => dateOnlyRegex.test(value) && dayjs(value).isValid(),
      `${fieldLabel} は YYYY-MM-DD または YYYY/MM/DD 形式で指定してください`,
    );
