"use client";

import { PropsWithChildren, useActionState } from "react";
import { ActionProps } from "./@types";
import { createRouteAction } from "@/app/route/actions/actions.server";

export function NewRouteForm(props: PropsWithChildren) {
  const [state, formAction] = useActionState<ActionProps | null, FormData>(createRouteAction, null);

  return (
    <form action={formAction}>
      {state?.error && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-4 border rounded text-contrast bg-success">
          <strong>Rota criada com sucesso</strong>
        </div>
      )}

      {props.children}
    </form>
  );
}
