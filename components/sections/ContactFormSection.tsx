// TODO: Replace NEXT_PUBLIC_FORMSPREE_ID in .env.local with your real Formspree form ID
// Create a form at https://formspree.io and copy the form ID
'use client'

import { useForm, ValidationError } from '@formspree/react'
import { Button } from '@/components/ui/Button'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Project Consultation',
  'Request for Inspection',
] as const

const inputClasses =
  'bg-surface-secondary border border-surface-border rounded-md px-md py-sm font-body text-text-primary focus:outline-none focus-visible:border-white/40 w-full'

export function ContactFormSection() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'placeholder'
  )

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-2xl text-center">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Message Received
        </h2>
        <p className="font-body mt-md text-text-secondary">
          Thank you for reaching out. We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-lg" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="name" className="font-body text-sm text-text-secondary">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClasses}
        />
        <ValidationError
          field="name"
          prefix="Name"
          errors={state.errors}
          className="text-destructive text-sm"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="email" className="font-body text-sm text-text-secondary">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
        <ValidationError
          field="email"
          prefix="Email"
          errors={state.errors}
          className="text-destructive text-sm"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="phone" className="font-body text-sm text-text-secondary">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={inputClasses}
        />
        <ValidationError
          field="phone"
          prefix="Phone"
          errors={state.errors}
          className="text-destructive text-sm"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="subject" className="font-body text-sm text-text-secondary">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className={`${inputClasses} appearance-none`}
        >
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ValidationError
          field="subject"
          prefix="Subject"
          errors={state.errors}
          className="text-destructive text-sm"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="message" className="font-body text-sm text-text-secondary">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`${inputClasses} resize-none`}
        />
        <ValidationError
          field="message"
          prefix="Message"
          errors={state.errors}
          className="text-destructive text-sm"
        />
      </div>

      {/* General errors */}
      <ValidationError
        errors={state.errors}
        className="text-destructive text-sm"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={state.submitting}
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
