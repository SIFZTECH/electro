"use client";

import { getAllMailTemplates, getMailTemplate } from "@/app/_services/apiMail";
import { useQuery } from "@tanstack/react-query";

export function useMails() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["mails"],
    queryFn: () => getAllMailTemplates(),
  });

  return { data, isLoading, error, isError };
}

export function useMail(name) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["mail", { name }],
    queryFn: () => getMailTemplate(name),
  });

  return { data, isLoading, error, isError };
}
