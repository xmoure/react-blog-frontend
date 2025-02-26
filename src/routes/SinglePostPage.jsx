import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${slug}`
  );
  return response.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  if (isPending) return "Loading...";
  if (error) return "Something went wrong: " + error.message;
  if (!data) return "Post not found!";
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user?.userName}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.description}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} width={600} className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie at velit sed viverra. Curabitur vitae augue consectetur,
            lobortis sem eu, hendrerit risus. Etiam finibus, odio at laoreet
            luctus, orci purus dignissim mauris, eu malesuada tortor lorem eu
            neque. Sed maximus sem sit amet mi euismod, at placerat tortor
            ornare. Cras mollis odio in nunc volutpat ultricies. Phasellus
            rutrum nisi in leo sollicitudin, a dapibus est convallis. Curabitur
            id augue sit amet enim malesuada fringilla. Morbi viverra, lorem at
            mattis placerat, lectus tortor sodales ex, sed laoreet neque lectus
            ut elit. Fusce sit amet nisl ultrices, elementum tortor in,
            venenatis dui. Pellentesque venenatis justo at sem ultricies
            aliquam. Donec ornare purus vitae eros blandit tristique. Nunc
            egestas posuere scelerisque. Aliquam in purus justo. Ut ut metus
            augue. Donec risus quam, tristique porttitor neque nec, pretium
            auctor tellus. Cras id ultrices enim, sed ultrices est. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Proin dapibus
            felis metus, ut elementum purus gravida eget. Nunc diam quam,
            vehicula ut vulputate ac, condimentum eu ante. Proin nec elit
            tincidunt tellus porttitor luctus. Praesent commodo massa nec orci
            consectetur commodo. Aenean metus est, ultricies non venenatis sit
            amet, eleifend nec mi. Proin sit amet dui blandit, pharetra leo et,
            ultricies orci. Suspendisse nec lacinia lorem. Phasellus nec semper
            dui. Maecenas sollicitudin eleifend arcu, in cursus nibh mollis
            vitae. Integer scelerisque molestie egestas. Fusce vulputate massa
            volutpat nibh faucibus fringilla. Proin elementum, urna sed congue
            efficitur, nisi enim molestie sapien, et scelerisque magna enim
            luctus felis. Nam elementum aliquet nulla in sodales. Maecenas
            pulvinar congue neque at aliquam. Pellentesque ultricies at mauris
            non scelerisque. Quisque semper ex eu orci posuere fringilla. Mauris
            at ante laoreet metus gravida commodo vel quis tortor. Donec vitae
            leo sed metus ullamcorper fringilla sed nec sem. Etiam magna arcu,
            bibendum id ornare vitae, commodo quis lacus. In eget viverra purus,
            sed ultricies risus. Nulla dui risus, dictum eu tristique ac,
            dapibus non sapien. Quisque sit amet mattis risus. Donec malesuada
            sollicitudin elit nec fringilla. Mauris quis iaculis velit, vel
            vestibulum mi. Integer faucibus sit amet neque nec feugiat. Integer
            ipsum neque, vestibulum et venenatis quis, feugiat semper justo.
            Integer sodales, eros id varius cursus, ligula ante posuere diam, et
            viverra erat lectus nec dolor. Nam lacinia fringilla ex, nec feugiat
            nibh varius at. Sed et vulputate tortor. Praesent porta ligula vel
            ante accumsan mattis. Aenean interdum tellus sed finibus ornare.
            Morbi justo lorem, porta in condimentum sed, lobortis vitae nulla.
            Fusce dignissim sem justo, ac convallis nunc accumsan dapibus. Ut ac
            leo eget urna vulputate congue at nec lorem. Aliquam erat volutpat.
            Phasellus imperdiet orci a tortor fringilla, vehicula congue sem
            consectetur. Vestibulum porttitor congue nunc a accumsan. Curabitur
            imperdiet ac lorem in euismod. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque
            venenatis diam a nisl sagittis egestas. Nulla fringilla orci eu
            tellus egestas, quis accumsan dolor ultricies. Etiam ultricies dolor
            vel ex viverra, cursus porta lectus elementum. Nulla ligula mi,
            viverra vel semper lobortis, aliquet et nisi. Nulla egestas
            porttitor lorem sed venenatis. Donec metus magna, bibendum in urna
            eu, finibus rutrum nunc. Proin tempor, libero eget volutpat
            eleifend, felis diam dignissim velit, non dapibus ipsum libero non
            eros.
          </p>
          <p>
            Proin dolor purus, imperdiet ultrices consequat at, mattis at urna.
            Integer hendrerit dolor a diam scelerisque, ut varius sem facilisis.
            Nunc ullamcorper libero ut tellus fermentum, ut scelerisque ante
            eleifend. Proin posuere ut est eu consequat. Ut vel ultricies justo.
            Nunc sed ornare sapien. Cras eleifend eros lacus, ullamcorper
            commodo orci varius ut. Aliquam aliquet rutrum lectus vel dapibus.
            Phasellus tempus nisi elit, venenatis aliquam leo bibendum non.
            Mauris et metus erat. Nullam viverra ac ligula sed porta.
            Pellentesque ligula tortor, tempor in hendrerit eu, laoreet
            fringilla risus. Quisque in elementum orci. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Proin at mollis augue. Mauris ut purus at sem fringilla posuere. In
            tincidunt finibus tortor, in luctus tellus gravida id. Cras
            consectetur neque interdum nisi iaculis euismod. Donec viverra ut
            urna ut imperdiet. Donec ipsum est, porttitor sit amet neque vel,
            condimentum cursus magna. Proin ut nunc id nunc condimentum
            vulputate volutpat vel eros. Phasellus blandit dapibus tristique.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Praesent aliquet lorem a metus ornare, vel
            laoreet nisl mattis. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Nunc sit amet iaculis
            turpis, at condimentum velit. Curabitur nec interdum nulla, a mattis
            metus. Vivamus non facilisis magna. Etiam pellentesque cursus
            turpis, vitae maximus tortor vehicula porttitor. Proin lacinia
            volutpat nisi at ornare. Phasellus fringilla pharetra magna ut
            vehicula. Sed eu maximus augue. Curabitur sagittis, erat vulputate
            imperdiet congue, ipsum augue consequat augue, sit amet rhoncus
            augue quam vitae ipsum. Aliquam vel ligula dapibus, suscipit dui
            vitae, vehicula mi. Morbi at nunc eu ante cursus auctor. Vivamus
            mattis erat eget tellus finibus tincidunt vel nec velit. Praesent
            vel bibendum nibh, sit amet fermentum neque. Donec sollicitudin
            ultricies pretium. Curabitur non nibh id tellus molestie tristique.
            Curabitur odio diam, sollicitudin non molestie sit amet, dapibus eu
            orci. Donec volutpat lacus in felis finibus, eu ultricies ipsum
            auctor. Aliquam eget turpis arcu. Fusce volutpat auctor eros a
            egestas. Suspendisse imperdiet dignissim lectus, eget varius orci
            gravida eget. Aliquam erat volutpat. Aenean ultrices gravida augue
            in condimentum. Nullam commodo urna condimentum sapien blandit
            facilisis. Sed ipsum purus, venenatis ac elementum a, tempus sit
            amet nisi. Ut hendrerit semper risus id lacinia. Vestibulum
            facilisis efficitur enim vel faucibus. Nullam sit amet dictum
            mauris, sed bibendum purus. Quisque non nisi non ligula mattis
            gravida.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie at velit sed viverra. Curabitur vitae augue consectetur,
            lobortis sem eu, hendrerit risus. Etiam finibus, odio at laoreet
            luctus, orci purus dignissim mauris, eu malesuada tortor lorem eu
            neque. Sed maximus sem sit amet mi euismod, at placerat tortor
            ornare. Cras mollis odio in nunc volutpat ultricies. Phasellus
            rutrum nisi in leo sollicitudin, a dapibus est convallis. Curabitur
            id augue sit amet enim malesuada fringilla. Morbi viverra, lorem at
            mattis placerat, lectus tortor sodales ex, sed laoreet neque lectus
            ut elit. Fusce sit amet nisl ultrices, elementum tortor in,
            venenatis dui. Pellentesque venenatis justo at sem ultricies
            aliquam. Donec ornare purus vitae eros blandit tristique. Nunc
            egestas posuere scelerisque. Aliquam in purus justo. Ut ut metus
            augue. Donec risus quam, tristique porttitor neque nec, pretium
            auctor tellus. Cras id ultrices enim, sed ultrices est. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Proin dapibus
            felis metus, ut elementum purus gravida eget. Nunc diam quam,
            vehicula ut vulputate ac, condimentum eu ante. Proin nec elit
            tincidunt tellus porttitor luctus. Praesent commodo massa nec orci
            consectetur commodo. Aenean metus est, ultricies non venenatis sit
            amet, eleifend nec mi. Proin sit amet dui blandit, pharetra leo et,
            ultricies orci. Suspendisse nec lacinia lorem. Phasellus nec semper
            dui. Maecenas sollicitudin eleifend arcu, in cursus nibh mollis
            vitae. Integer scelerisque molestie egestas. Fusce vulputate massa
            volutpat nibh faucibus fringilla. Proin elementum, urna sed congue
            efficitur, nisi enim molestie sapien, et scelerisque magna enim
            luctus felis. Nam elementum aliquet nulla in sodales. Maecenas
            pulvinar congue neque at aliquam. Pellentesque ultricies at mauris
            non scelerisque. Quisque semper ex eu orci posuere fringilla. Mauris
            at ante laoreet metus gravida commodo vel quis tortor. Donec vitae
            leo sed metus ullamcorper fringilla sed nec sem. Etiam magna arcu,
            bibendum id ornare vitae, commodo quis lacus. In eget viverra purus,
            sed ultricies risus. Nulla dui risus, dictum eu tristique ac,
            dapibus non sapien. Quisque sit amet mattis risus. Donec malesuada
            sollicitudin elit nec fringilla. Mauris quis iaculis velit, vel
            vestibulum mi. Integer faucibus sit amet neque nec feugiat. Integer
            ipsum neque, vestibulum et venenatis quis, feugiat semper justo.
            Integer sodales, eros id varius cursus, ligula ante posuere diam, et
            viverra erat lectus nec dolor. Nam lacinia fringilla ex, nec feugiat
            nibh varius at. Sed et vulputate tortor. Praesent porta ligula vel
            ante accumsan mattis. Aenean interdum tellus sed finibus ornare.
            Morbi justo lorem, porta in condimentum sed, lobortis vitae nulla.
            Fusce dignissim sem justo, ac convallis nunc accumsan dapibus. Ut ac
            leo eget urna vulputate congue at nec lorem. Aliquam erat volutpat.
            Phasellus imperdiet orci a tortor fringilla, vehicula congue sem
            consectetur. Vestibulum porttitor congue nunc a accumsan. Curabitur
            imperdiet ac lorem in euismod. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque
            venenatis diam a nisl sagittis egestas. Nulla fringilla orci eu
            tellus egestas, quis accumsan dolor ultricies. Etiam ultricies dolor
            vel ex viverra, cursus porta lectus elementum. Nulla ligula mi,
            viverra vel semper lobortis, aliquet et nisi. Nulla egestas
            porttitor lorem sed venenatis. Donec metus magna, bibendum in urna
            eu, finibus rutrum nunc. Proin tempor, libero eget volutpat
            eleifend, felis diam dignissim velit, non dapibus ipsum libero non
            eros.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie at velit sed viverra. Curabitur vitae augue consectetur,
            lobortis sem eu, hendrerit risus. Etiam finibus, odio at laoreet
            luctus, orci purus dignissim mauris, eu malesuada tortor lorem eu
            neque. Sed maximus sem sit amet mi euismod, at placerat tortor
            ornare. Cras mollis odio in nunc volutpat ultricies. Phasellus
            rutrum nisi in leo sollicitudin, a dapibus est convallis. Curabitur
            id augue sit amet enim malesuada fringilla. Morbi viverra, lorem at
            mattis placerat, lectus tortor sodales ex, sed laoreet neque lectus
            ut elit. Fusce sit amet nisl ultrices, elementum tortor in,
            venenatis dui. Pellentesque venenatis justo at sem ultricies
            aliquam. Donec ornare purus vitae eros blandit tristique. Nunc
            egestas posuere scelerisque. Aliquam in purus justo. Ut ut metus
            augue. Donec risus quam, tristique porttitor neque nec, pretium
            auctor tellus. Cras id ultrices enim, sed ultrices est. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Proin dapibus
            felis metus, ut elementum purus gravida eget. Nunc diam quam,
            vehicula ut vulputate ac, condimentum eu ante. Proin nec elit
            tincidunt tellus porttitor luctus. Praesent commodo massa nec orci
            consectetur commodo. Aenean metus est, ultricies non venenatis sit
            amet, eleifend nec mi. Proin sit amet dui blandit, pharetra leo et,
            ultricies orci. Suspendisse nec lacinia lorem. Phasellus nec semper
            dui. Maecenas sollicitudin eleifend arcu, in cursus nibh mollis
            vitae. Integer scelerisque molestie egestas. Fusce vulputate massa
            volutpat nibh faucibus fringilla. Proin elementum, urna sed congue
            efficitur, nisi enim molestie sapien, et scelerisque magna enim
            luctus felis. Nam elementum aliquet nulla in sodales. Maecenas
            pulvinar congue neque at aliquam. Pellentesque ultricies at mauris
            non scelerisque. Quisque semper ex eu orci posuere fringilla. Mauris
            at ante laoreet metus gravida commodo vel quis tortor. Donec vitae
            leo sed metus ullamcorper fringilla sed nec sem. Etiam magna arcu,
            bibendum id ornare vitae, commodo quis lacus. In eget viverra purus,
            sed ultricies risus. Nulla dui risus, dictum eu tristique ac,
            dapibus non sapien. Quisque sit amet mattis risus. Donec malesuada
            sollicitudin elit nec fringilla. Mauris quis iaculis velit, vel
            vestibulum mi. Integer faucibus sit amet neque nec feugiat. Integer
            ipsum neque, vestibulum et venenatis quis, feugiat semper justo.
            Integer sodales, eros id varius cursus, ligula ante posuere diam, et
            viverra erat lectus nec dolor. Nam lacinia fringilla ex, nec feugiat
            nibh varius at. Sed et vulputate tortor. Praesent porta ligula vel
            ante accumsan mattis. Aenean interdum tellus sed finibus ornare.
            Morbi justo lorem, porta in condimentum sed, lobortis vitae nulla.
            Fusce dignissim sem justo, ac convallis nunc accumsan dapibus. Ut ac
            leo eget urna vulputate congue at nec lorem. Aliquam erat volutpat.
            Phasellus imperdiet orci a tortor fringilla, vehicula congue sem
            consectetur. Vestibulum porttitor congue nunc a accumsan. Curabitur
            imperdiet ac lorem in euismod. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque
            venenatis diam a nisl sagittis egestas. Nulla fringilla orci eu
            tellus egestas, quis accumsan dolor ultricies. Etiam ultricies dolor
            vel ex viverra, cursus porta lectus elementum. Nulla ligula mi,
            viverra vel semper lobortis, aliquet et nisi. Nulla egestas
            porttitor lorem sed venenatis. Donec metus magna, bibendum in urna
            eu, finibus rutrum nunc. Proin tempor, libero eget volutpat
            eleifend, felis diam dignissim velit, non dapibus ipsum libero non
            eros.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie at velit sed viverra. Curabitur vitae augue consectetur,
            lobortis sem eu, hendrerit risus. Etiam finibus, odio at laoreet
            luctus, orci purus dignissim mauris, eu malesuada tortor lorem eu
            neque. Sed maximus sem sit amet mi euismod, at placerat tortor
            ornare. Cras mollis odio in nunc volutpat ultricies. Phasellus
            rutrum nisi in leo sollicitudin, a dapibus est convallis. Curabitur
            id augue sit amet enim malesuada fringilla. Morbi viverra, lorem at
            mattis placerat, lectus tortor sodales ex, sed laoreet neque lectus
            ut elit. Fusce sit amet nisl ultrices, elementum tortor in,
            venenatis dui. Pellentesque venenatis justo at sem ultricies
            aliquam. Donec ornare purus vitae eros blandit tristique. Nunc
            egestas posuere scelerisque. Aliquam in purus justo. Ut ut metus
            augue. Donec risus quam, tristique porttitor neque nec, pretium
            auctor tellus. Cras id ultrices enim, sed ultrices est. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Proin dapibus
            felis metus, ut elementum purus gravida eget. Nunc diam quam,
            vehicula ut vulputate ac, condimentum eu ante. Proin nec elit
            tincidunt tellus porttitor luctus. Praesent commodo massa nec orci
            consectetur commodo. Aenean metus est, ultricies non venenatis sit
            amet, eleifend nec mi. Proin sit amet dui blandit, pharetra leo et,
            ultricies orci. Suspendisse nec lacinia lorem. Phasellus nec semper
            dui. Maecenas sollicitudin eleifend arcu, in cursus nibh mollis
            vitae. Integer scelerisque molestie egestas. Fusce vulputate massa
            volutpat nibh faucibus fringilla. Proin elementum, urna sed congue
            efficitur, nisi enim molestie sapien, et scelerisque magna enim
            luctus felis. Nam elementum aliquet nulla in sodales. Maecenas
            pulvinar congue neque at aliquam. Pellentesque ultricies at mauris
            non scelerisque. Quisque semper ex eu orci posuere fringilla. Mauris
            at ante laoreet metus gravida commodo vel quis tortor. Donec vitae
            leo sed metus ullamcorper fringilla sed nec sem. Etiam magna arcu,
            bibendum id ornare vitae, commodo quis lacus. In eget viverra purus,
            sed ultricies risus. Nulla dui risus, dictum eu tristique ac,
            dapibus non sapien. Quisque sit amet mattis risus. Donec malesuada
            sollicitudin elit nec fringilla. Mauris quis iaculis velit, vel
            vestibulum mi. Integer faucibus sit amet neque nec feugiat. Integer
            ipsum neque, vestibulum et venenatis quis, feugiat semper justo.
            Integer sodales, eros id varius cursus, ligula ante posuere diam, et
            viverra erat lectus nec dolor. Nam lacinia fringilla ex, nec feugiat
            nibh varius at. Sed et vulputate tortor. Praesent porta ligula vel
            ante accumsan mattis. Aenean interdum tellus sed finibus ornare.
            Morbi justo lorem, porta in condimentum sed, lobortis vitae nulla.
            Fusce dignissim sem justo, ac convallis nunc accumsan dapibus. Ut ac
            leo eget urna vulputate congue at nec lorem. Aliquam erat volutpat.
            Phasellus imperdiet orci a tortor fringilla, vehicula congue sem
            consectetur. Vestibulum porttitor congue nunc a accumsan. Curabitur
            imperdiet ac lorem in euismod. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque
            venenatis diam a nisl sagittis egestas. Nulla fringilla orci eu
            tellus egestas, quis accumsan dolor ultricies. Etiam ultricies dolor
            vel ex viverra, cursus porta lectus elementum. Nulla ligula mi,
            viverra vel semper lobortis, aliquet et nisi. Nulla egestas
            porttitor lorem sed venenatis. Donec metus magna, bibendum in urna
            eu, finibus rutrum nunc. Proin tempor, libero eget volutpat
            eleifend, felis diam dignissim velit, non dapibus ipsum libero non
            eros.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie at velit sed viverra. Curabitur vitae augue consectetur,
            lobortis sem eu, hendrerit risus. Etiam finibus, odio at laoreet
            luctus, orci purus dignissim mauris, eu malesuada tortor lorem eu
            neque. Sed maximus sem sit amet mi euismod, at placerat tortor
            ornare. Cras mollis odio in nunc volutpat ultricies. Phasellus
            rutrum nisi in leo sollicitudin, a dapibus est convallis. Curabitur
            id augue sit amet enim malesuada fringilla. Morbi viverra, lorem at
            mattis placerat, lectus tortor sodales ex, sed laoreet neque lectus
            ut elit. Fusce sit amet nisl ultrices, elementum tortor in,
            venenatis dui. Pellentesque venenatis justo at sem ultricies
            aliquam. Donec ornare purus vitae eros blandit tristique. Nunc
            egestas posuere scelerisque. Aliquam in purus justo. Ut ut metus
            augue. Donec risus quam, tristique porttitor neque nec, pretium
            auctor tellus. Cras id ultrices enim, sed ultrices est. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Proin dapibus
            felis metus, ut elementum purus gravida eget. Nunc diam quam,
            vehicula ut vulputate ac, condimentum eu ante. Proin nec elit
            tincidunt tellus porttitor luctus. Praesent commodo massa nec orci
            consectetur commodo. Aenean metus est, ultricies non venenatis sit
            amet, eleifend nec mi. Proin sit amet dui blandit, pharetra leo et,
            ultricies orci. Suspendisse nec lacinia lorem. Phasellus nec semper
            dui. Maecenas sollicitudin eleifend arcu, in cursus nibh mollis
            vitae. Integer scelerisque molestie egestas. Fusce vulputate massa
            volutpat nibh faucibus fringilla. Proin elementum, urna sed congue
            efficitur, nisi enim molestie sapien, et scelerisque magna enim
            luctus felis. Nam elementum aliquet nulla in sodales. Maecenas
            pulvinar congue neque at aliquam. Pellentesque ultricies at mauris
            non scelerisque. Quisque semper ex eu orci posuere fringilla. Mauris
            at ante laoreet metus gravida commodo vel quis tortor. Donec vitae
            leo sed metus ullamcorper fringilla sed nec sem. Etiam magna arcu,
            bibendum id ornare vitae, commodo quis lacus. In eget viverra purus,
            sed ultricies risus. Nulla dui risus, dictum eu tristique ac,
            dapibus non sapien. Quisque sit amet mattis risus. Donec malesuada
            sollicitudin elit nec fringilla. Mauris quis iaculis velit, vel
            vestibulum mi. Integer faucibus sit amet neque nec feugiat. Integer
            ipsum neque, vestibulum et venenatis quis, feugiat semper justo.
            Integer sodales, eros id varius cursus, ligula ante posuere diam, et
            viverra erat lectus nec dolor. Nam lacinia fringilla ex, nec feugiat
            nibh varius at. Sed et vulputate tortor. Praesent porta ligula vel
            ante accumsan mattis. Aenean interdum tellus sed finibus ornare.
            Morbi justo lorem, porta in condimentum sed, lobortis vitae nulla.
            Fusce dignissim sem justo, ac convallis nunc accumsan dapibus. Ut ac
            leo eget urna vulputate congue at nec lorem. Aliquam erat volutpat.
            Phasellus imperdiet orci a tortor fringilla, vehicula congue sem
            consectetur. Vestibulum porttitor congue nunc a accumsan. Curabitur
            imperdiet ac lorem in euismod. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Pellentesque
            venenatis diam a nisl sagittis egestas. Nulla fringilla orci eu
            tellus egestas, quis accumsan dolor ultricies. Etiam ultricies dolor
            vel ex viverra, cursus porta lectus elementum. Nulla ligula mi,
            viverra vel semper lobortis, aliquet et nisi. Nulla egestas
            porttitor lorem sed venenatis. Donec metus magna, bibendum in urna
            eu, finibus rutrum nunc. Proin tempor, libero eget volutpat
            eleifend, felis diam dignissim velit, non dapibus ipsum libero non
            eros.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium"> Author</h1>
          <div className="flex- flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.img && (
                <Image
                  src="userImg.jpeg"
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              )}
              <Link className="text-blue-800">{data.user?.userName}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Sed tortor sapien, vestibulum sit amet auctor sed, tristique quis
              velit.
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design{" "}
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
