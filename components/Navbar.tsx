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
      <MenubarItem>
        <Link href={`/aws/cloud-practitioner/practise-exam/${count}`}>
          Practise Exam #{count}
        </Link>
      </MenubarItem>
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
            <MenubarSubContent className="h-[90vh] overflow-y-visible">
              <MenubarItem>
                <Link href="/aws/cloud-practitioner/random-exam/">
                  Random Exam
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/">Practise Random Exam</Link>
              </MenubarItem>
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
