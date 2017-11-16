I=0
if [ $1 ]; then
  EXIT=$1
fi
for avatar in `ls ../../server/public/avatars`
do
  if [ $EXIT ] && [ $EXIT == $I ]; then
    exit 0;
  fi
  number=$RANDOM
  let "number %= 5"
  number=$((number+1))
  I=$((I+1))
  echo "User-$I: $number"
  ./vote.sh "User-$I" "$avatar" $number 
done
