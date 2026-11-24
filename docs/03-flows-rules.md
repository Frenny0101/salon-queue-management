# Flows & Rules

## Flow: remote customer
1. Opens Home → Join Queue.
2. Enters name and phone, chooses service(s) and barber.
3. Receives a token and opens My Status.
4. Reception calls the next eligible customer for a barber.
5. Customer status changes to Called; receptionist seats them.
6. Barber starts service and marks Done; customer leaves the active queue.

## Flow: walk-in
Reception taps Add walk-in, enters name, phone, service and barber preference. The customer joins the same queue at the end.

## Rules
- Statuses: Waiting → Called → In chair → Done. Waiting → Cancelled. Called → No-show.
- First come, first served.
- Call next for barber X selects the earliest waiting customer who chose X or Any.
- A customer who chose a named barber is never assigned to another barber.
- A barber has only one customer in the chair at a time.
- Approximate waiting time = service minutes ahead ÷ active barbers not on break.
- One active spot per phone number.
- Called but not present can be marked No-show. If they return, add them again at the END with a new token.
- Closing online queue disables online joining; walk-ins remain possible.
- Barber on break is not eligible for new assignments.

## Test checklist
- [ ] Join with two services; total duration and price update.
- [ ] Same phone joins twice; existing active spot is shown.
- [ ] Call next for Amit skips a customer who chose Ravi.
- [ ] Call next assigns the earliest Any customer if no earlier barber-specific customer exists.
- [ ] Start/Done on Barber View updates Reception and TV in other tabs.
- [ ] No-show then re-add creates a new token at the end.
- [ ] Close online queue disables customer Join.
- [ ] Waiting time decreases as customers finish.
- [ ] Phone-sized, tablet and TV layouts remain usable.
