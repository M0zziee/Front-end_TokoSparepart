import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sistem Kasir & POS </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Jl. Cimanuk No.101a, Jayaraga, Kec. Tarogong Kidul Kabupaten Garut,
            Jawa Barat
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Masukan Username"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" disabled>
            Login
          </Button>
          <FieldDescription className="text-center">
            Autentikasi segera hadir.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
