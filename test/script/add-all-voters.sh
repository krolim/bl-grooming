I=0
if [ $1 ]; then
  EXIT=$1
fi
for avatar in `ls ../../server/public/avatars`
do
  if [ $EXIT ] && [ $EXIT == $I ]; then
    exit 0;
  fi
  I=$((I+1))
  echo "User-$I"
  ./register-voter.sh "User-$I" "$avatar" 
done