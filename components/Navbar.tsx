import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggle";

const AWSCloudPractitionerPractiseExams = () => {
  const links = [];
  let count = 1;

  while (count <= 23) {
    links.push(
      <Link href={`/aws/cloud-practitioner/practise-exam/${count}`}>
        <MenubarItem>Practise Exam #{count}</MenubarItem>
      </Link>
    );
    count++;
  }

  return links;
};

const Navbar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>AWS</MenubarTrigger>

        <MenubarContent>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Cloud Practitioner</MenubarSubTrigger>
            <MenubarSubContent className="max-h-[90vh] overflow-y-visible">
              <Link href="/aws/cloud-practitioner/random-exam/">
                <MenubarItem>Random Exam</MenubarItem>
              </Link>

              <MenubarSeparator />
              <Link href="/aws/cloud-practitioner/practise-random-exam">
                <MenubarItem>Practise Random Exam</MenubarItem>
              </Link>
              <MenubarSeparator />
              <AWSCloudPractitionerPractiseExams />
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>

        <ModeToggle />
      </MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
