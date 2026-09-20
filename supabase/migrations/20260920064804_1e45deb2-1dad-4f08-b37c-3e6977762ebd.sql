CREATE POLICY "Service functions manage Clip orders"
ON public.clip_orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);