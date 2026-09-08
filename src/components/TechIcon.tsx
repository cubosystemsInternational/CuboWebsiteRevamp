import type { IconType } from 'react-icons';
import {
  SiAngular, SiJquery, SiJoomla, SiJavascript, SiBootstrap,
  SiOpenjdk, SiPhp, SiPython, SiFlutter, SiReact, SiDotnet, SiSpring,
  SiGoogle, SiApachehadoop,
} from 'react-icons/si';
import { TbBrandAzure, TbBrandVisualStudio, TbSql, TbCpu } from 'react-icons/tb';

// Maps each real technology name to its brand icon. Five technologies have
// no matching mark in either icon set (Knockout, SharePoint, Power BI, and
// the two AI-concept entries) and fall back to a neutral chip glyph rather
// than a mismatched substitute.
const iconMap: Record<string, IconType> = {
  AngularJS: SiAngular,
  jQuery: SiJquery,
  Joomla: SiJoomla,
  JavaScript: SiJavascript,
  Bootstrap: SiBootstrap,
  Java: SiOpenjdk,
  'Java EE': SiOpenjdk,
  PHP: SiPhp,
  Python: SiPython,
  Flutter: SiFlutter,
  'React Native': SiReact,
  '.NET Core': SiDotnet,
  Azure: TbBrandAzure,
  'Visual Studio': TbBrandVisualStudio,
  Spring: SiSpring,
  'Google AI': SiGoogle,
  'Microsoft SQL Server': TbSql,
  Hadoop: SiApachehadoop,
};

export default function TechIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? TbCpu;
  return <Icon className="tech-icon-svg" aria-hidden="true" />;
}
