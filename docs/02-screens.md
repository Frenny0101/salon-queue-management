# Screens & Features

## Screen 1: Home (/)
- Salon overview with waiting count, barbers working, estimated wait and served count.
- Live queue preview and barber availability.
- Link to Reception and Owner settings.

## Screen 2: Join Queue (/join)
- Name and 10-digit phone validation.
- Service cards; multi-select, maximum 3; show duration and price.
- Barber picker: Any barber or named barber.
- Summary recalculates duration and service total.
- Confirm creates a token and opens customer status.
- If phone already has an active spot, show the existing token.

## Screen 3: My Status (/status/:id)
- Large token, position, estimated wait and barber.
- Journey: Joined, Called, In chair, Completed.
- Cancel my spot with confirmation.
- /status supports phone-number lookup.

## Screen 4: Reception Dashboard (/reception)
- Barber station cards with current customer and Call next.
- Waiting list with token, name, services, preferred barber and waiting time.
- Add walk-in modal; No-show, Seat and Cancel actions.

## Screen 5: Barber View (/barber)
- Select barber.
- Current customer and services.
- Start service, Mark as done.
- Set station On break or Available.
- Show next eligible customer.

## Screen 6: Waiting Area TV (/display)
- One station per barber with current token and status.
- Next five waiting tokens.
- Dark, high-contrast display.

## Screen 7: Owner Settings (/admin)
- Services with duration, price and active toggle; add a service.
- Barbers on duty and availability.
- Online queue open/closed.
- Today's served, no-show and active queue statistics.
