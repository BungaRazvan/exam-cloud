import { MenubarItem } from "@/components/ui/menubar";
import { awsCloudPractitionerResultsPath } from "@/lib/constants";
import { getLS } from "@/lib/utils";
import Link from "next/link";

const AWSCloudPractitionerPractiseExamsNavbarLinks: React.FC = () => {
  const links = [];
  let count = 1;

  const cloudPractResults = getLS(awsCloudPractitionerResultsPath, {}, "obj");

  while (count <= 23) {
    links.push(
      <Link
        key={`/aws/cloud-practitioner/practise-exam/${count}`}
        href={`/aws/cloud-practitioner/practise-exam/${count}`}
      >
        <MenubarItem className="justify-between">
          Practise Exam #{count}
          <span>
            {cloudPractResults[count.toString()] && "✔️"}
            {cloudPractResults[count.toString()] == false && "❌"}
          </span>
        </MenubarItem>
      </Link>
    );
    count++;
  }

  return links;
};

export default AWSCloudPractitionerPractiseExamsNavbarLinks;
