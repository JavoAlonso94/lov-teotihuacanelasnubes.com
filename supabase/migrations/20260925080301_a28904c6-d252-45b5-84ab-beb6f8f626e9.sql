ALTER TABLE public.clip_orders
  ADD COLUMN IF NOT EXISTS client_ip text,
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS risk_level text,
  ADD COLUMN IF NOT EXISTS postal_code text;
CREATE INDEX IF NOT EXISTS clip_orders_email_created_idx ON public.clip_orders (customer_email, created_at DESC);
CREATE INDEX IF NOT EXISTS clip_orders_ip_created_idx ON public.clip_orders (client_ip, created_at DESC);
CREATE INDEX IF NOT EXISTS clip_orders_payment_idx ON public.clip_orders (clip_payment_id);