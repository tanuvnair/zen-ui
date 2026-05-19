import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card/card";
import { Button } from "./button/button";
import { DemoPage } from "./demo-helpers";

const NewCardDemo = () => (
  <DemoPage
    title="Card"
    description="Generic surface primitive. Compound API: Header / Title / Description / Content / Footer — every part opt-in."
  >
    <div class="grid grid-cols-2 gap-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your billing + contact info.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm">Pull up of profile info here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Save</Button>
          <Button size="sm" variant="ghost">Cancel</Button>
        </CardFooter>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Same shape with a small drop-shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm">For features you want to make pop.</p>
        </CardContent>
      </Card>

      <Card variant="ghost" padding="md">
        <CardTitle>Ghost</CardTitle>
        <CardDescription>
          Transparent border. Useful when nesting inside another surface.
        </CardDescription>
      </Card>

      <Card variant="outlined" padding="lg">
        <CardTitle>Outlined · padding=lg</CardTitle>
        <CardDescription>
          A single content slot without the header/footer scaffolding.
        </CardDescription>
      </Card>
    </div>
  </DemoPage>
);

export default NewCardDemo;
