interface UserProfileProps {
  name: string
  email: string
  initials: string
}

function UserProfile({ name, email, initials }: UserProfileProps) {
  return (
    <div
      aria-label={`Previewing as ${name}`}
      className="flex min-w-0 items-center gap-2 rounded-lg px-1.5 py-1"
    >
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground"
      >
        {initials}
      </span>
      <span className="hidden min-w-0 flex-col text-left leading-tight sm:flex">
        <span className="max-w-28 truncate type-caption font-medium text-foreground">
          {name}
        </span>
        <span className="max-w-28 truncate type-caption text-muted-foreground">
          {email}
        </span>
      </span>
    </div>
  )
}

export { UserProfile }
export type { UserProfileProps }
