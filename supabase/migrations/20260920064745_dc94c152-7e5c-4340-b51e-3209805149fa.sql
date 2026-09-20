CREATE TABLE public.clip_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key uuid NOT NULL UNIQUE,
  package_id text NOT NULL,
  flight_date date NOT NULL,
  passengers integer NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'MXN',
  status text NOT NULL DEFAULT 'pending',
  clip_payment_id text,
  clip_status text,
  provider_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.clip_orders TO service_role;
ALTER TABLE public.clip_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_orders ADD CONSTRAINT clip_orders_package_check CHECK (package_id IN ('compartido','todo-incluido','privado','familiar','pedida','celebracion'));
ALTER TABLE public.clip_orders ADD CONSTRAINT clip_orders_passengers_check CHECK (passengers BETWEEN 1 AND 20);
ALTER TABLE public.clip_orders ADD CONSTRAINT clip_orders_amount_check CHECK (amount > 0);
ALTER TABLE public.clip_orders ADD CONSTRAINT clip_orders_status_check CHECK (status IN ('pending','approved','rejected','cancelled','refunded','error'));
CREATE OR REPLACE FUNCTION public.update_clip_orders_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER update_clip_orders_updated_at
BEFORE UPDATE ON public.clip_orders
FOR EACH ROW EXECUTE FUNCTION public.update_clip_orders_updated_at();