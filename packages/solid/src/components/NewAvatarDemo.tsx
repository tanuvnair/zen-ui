import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "./avatar/avatar";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewAvatarDemo = () => (
  <DemoPage
    title="Avatar"
    description="Image with graceful fallback. Built on Kobalte Image primitive."
  >
    <DemoSection title="Sizes">
      <Avatar size="xs"><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar size="sm"><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback>AB</AvatarFallback></Avatar>
    </DemoSection>

    <DemoSection title="With image">
      <Avatar size="lg">
        <AvatarImage
          src="https://i.pravatar.cc/96?img=12"
          alt="Avatar"
        />
        <AvatarFallback>RD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://broken.invalid/x.png" alt="broken" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    </DemoSection>

    <DemoSection title="Group with overflow">
      <AvatarGroup max={3} size="md">
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
      </AvatarGroup>
    </DemoSection>
  </DemoPage>
);

export default NewAvatarDemo;
